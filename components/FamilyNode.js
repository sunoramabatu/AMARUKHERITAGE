"use client"

import PersonCard from "./PersonCard"

export default function FamilyNode({person}){

return(

<div className="flex flex-col items-center">

<PersonCard person={person}/>

{person.children.length>0 &&(

<div className="mt-6 flex gap-12">

{person.children.map(child=>(
<FamilyNode key={child.id} person={child}/>
))}

</div>

)}

</div>

)

}