"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useState } from "react";
import EditAnggotaModal from "../components/EditAnggotaModal";

export default function FamilyTree({ keluarga }) {

const [selectedAnggota, setSelectedAnggota] = useState(null);
const svgRef = useRef(null);

useEffect(()=>{

if(!keluarga || keluarga.length===0) return;

const svg=d3.select(svgRef.current);
svg.selectAll("*").remove();

const g=svg.append("g");



// ZOOM
const zoom = d3.zoom()
.scaleExtent([0.3,2])
.on("zoom",(e)=>{
g.attr("transform",e.transform)
})

svg.call(zoom)

// =================
// CONFIG
// =================

const CARD_W = 200
const CARD_H = 190
const PHOTO = 120
const COUPLE_GAP = 40

// =================
// FAST DATA MAP
// =================

const byId = {}
const spouseMap = {}
const childrenMap = {}

keluarga.forEach(p=>{

byId[p.id] = p

// pasangan dua arah otomatis
if(p.pasangan_id){
spouseMap[p.id] = p.pasangan_id
spouseMap[p.pasangan_id] = p.id
}

// anak dari ayah
if(p.ayah_id){

if(!childrenMap[p.ayah_id])
childrenMap[p.ayah_id] = []

childrenMap[p.ayah_id].push(p)

}

// anak dari ibu
if(p.ibu_id){

if(!childrenMap[p.ibu_id])
childrenMap[p.ibu_id] = []

childrenMap[p.ibu_id].push(p)

}

})

// =================
// ROOT (AMARI RUKMINI)
// =================

const amari = keluarga.find(x=>x.nama?.toLowerCase()==="amari")
const rukmini = keluarga.find(x=>x.nama?.toLowerCase()==="rukmini")

if(!amari || !rukmini) return

const rootData={
type:"couple",
suami:amari,
istri:rukmini,
children:[]
}

// =================
// BUILD TREE
// =================
const visited = new Set()
function buildNode(person){

if(!person) return null

// cegah infinite loop
if(visited.has(person.id)){
return null
}

visited.add(person.id)

const spouseId = spouseMap[person.id]

let node

if(spouseId){

const spouse = byId[spouseId]

node={
type:"couple",
suami:person,
istri:spouse,
children:[]
}

}else{

node={
type:"single",
person:person,
children:[]
}

}

// ambil anak dari ayah / ibu
const kids = childrenMap[person.id] || []

kids.forEach(child=>{

if(!visited.has(child.id)){
const childNode = buildNode(child)

if(childNode){
node.children.push(childNode)
}
}

})

return node
}

// build root children
const rootKids = [
...(childrenMap[amari.id] || []),
...(childrenMap[rukmini.id] || [])
]

rootKids.forEach(child=>{
rootData.children.push(buildNode(child))
})

// =================
// D3 TREE
// =================
const root = d3.hierarchy(rootData)

const treeLayout = d3.tree()
.nodeSize([300,300])
.separation((a,b)=>{

const isCoupleA = a.data.type === "couple"
const isCoupleB = b.data.type === "couple"

const base = a.parent === b.parent ? 1 : 1.6

// jika salah satu couple → kasih jarak lebih besar
if(isCoupleA || isCoupleB){
  return base * 1.6
}

// kalau dua-duanya single → rapatkan
return base * 0.9

});

treeLayout(root)

// AUTO CENTER TREE

const svgWidth = typeof window !== "undefined" ? window.innerWidth : 1200
const xOffset = svgWidth / 2 - 200

g.attr("transform", `translate(${xOffset},80)`)

// =================
// LINKS
// =================

g.selectAll("path")
.data(root.links())
.enter()
.append("path")
.attr("fill","none")
.attr("stroke","#444")
.attr("stroke-width",2)
.attr("d",d=>{

const sx=d.source.x
const sy=d.source.y

const tx=d.target.x
const ty=d.target.y

// tengah pasangan
const parentY = sy

// garis horizontal anak
const horizontalY = ty - CARD_H/2 - 25

// atas kotak anak
const childTop = ty - CARD_H/2

return `
M ${sx},${parentY}
V ${horizontalY}
H ${tx}
V ${childTop}
`

})

// =================
// NODE GROUP
// =================

const node=g.selectAll(".node")
.data(root.descendants())
.enter()
.append("g")
.attr("transform",d=>`translate(${d.x},${d.y})`)


// =================
// DRAW CARD
// =================

function drawPerson(group,person,xOffset){
  
const card = group.append("rect")
.attr("x",xOffset-CARD_W/2)
.attr("y",-CARD_H/2)
.attr("width",CARD_W)
.attr("height",CARD_H)
.attr("rx",14)
.attr("fill","#fff")
.attr("stroke","#2E7D32")
.attr("stroke-width",2)
.style("cursor","pointer")
.on("click", () => {
setSelectedAnggota(person);
});

group.append("image")
.attr("href", person.foto ? person.foto + "?t=" + Date.now() : "/avatar.png")
.attr("x",xOffset-PHOTO/2)
.attr("y",-CARD_H/2+10)
.attr("width",PHOTO)
.attr("height",PHOTO)
.attr("preserveAspectRatio","xMidYMid slice")
.style("cursor","pointer")
.on("click", () => {
setSelectedAnggota(person);
});

const name=group.append("text")
.attr("x",xOffset)
.attr("y",PHOTO/2)
.attr("text-anchor","middle")
.attr("font-size",13)
.attr("font-weight","bold")

const words=person.nama.split(" ")
let line=[]
let tspan=name.append("tspan").attr("x",xOffset).attr("dy",0)

words.forEach(w=>{

line.push(w)
tspan.text(line.join(" "))

if(tspan.node().getComputedTextLength()>CARD_W-20){

line.pop()
tspan.text(line.join(" "))
line=[w]

tspan=name.append("tspan")
.attr("x",xOffset)
.attr("dy",15)
.text(w)

}

})

group.append("text")
.attr("x",xOffset)
.attr("y",CARD_H/2-5)
.attr("text-anchor","middle")
.attr("font-size",12)
.attr("fill","#666")
.text(person.tahun_lahir || "")

}

// =================
// RENDER NODE
// =================

node.each(function(d){

const group=d3.select(this)

if(d.data.type==="couple"){

drawPerson(group,d.data.suami,-(CARD_W/2+COUPLE_GAP/2))
drawPerson(group,d.data.istri,(CARD_W/2+COUPLE_GAP/2))

group.append("line")
.attr("x1",-COUPLE_GAP/2)
.attr("y1",0)
.attr("x2",COUPLE_GAP/2)
.attr("y2",0)
.attr("stroke","#444")
.attr("stroke-width",2)

}

if(d.data.type==="single"){

drawPerson(group,d.data.person,0)

}

})

if (typeof window !== "undefined") {

const handler = (e)=>{

const keyword = e.detail.toLowerCase()

if(!keyword) return

const found = root.descendants().find(d => {

if(d.data.type === "single"){
return d.data.person?.nama?.toLowerCase().includes(keyword)
}

if(d.data.type === "couple"){
return (
d.data.suami?.nama?.toLowerCase().includes(keyword) ||
d.data.istri?.nama?.toLowerCase().includes(keyword)
)
}

return false

})

if(found){

const x = found.x
const y = found.y

svg.transition().duration(700).call(
zoom.transform,
d3.zoomIdentity.translate(
window.innerWidth/2 - x,
200 - y
).scale(1.2)
)

}

}

window.addEventListener("searchKeluarga", handler)

// cleanup biar aman
return () => window.removeEventListener("searchKeluarga", handler)

}

const keyword = e.detail.toLowerCase()

const found = root.descendants().find(d =>
d.data?.nama?.toLowerCase().includes(keyword)
)

if(found){

const x = found.x
const y = found.y

svg.transition().duration(700).call(
zoom.transform,
d3.zoomIdentity.translate(
window.innerWidth/2 - x,
200 - y
).scale(1.2)
)

}

})

},[keluarga])

return(

<div className="w-screen h-[calc(100vh-120px)] bg-[#F4EFE6]">

<svg
ref={svgRef}
width="100%"
height="100%"
/>
{selectedAnggota && (
  <EditAnggotaModal
    anggota={selectedAnggota}
    onClose={() => setSelectedAnggota(null)}
  />
)}
</div>

)

}
