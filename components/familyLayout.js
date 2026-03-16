export function buildFamilyTree(data){

  const map = {}

  data.forEach(p=>{
    map[p.id] = {
      ...p,
      children:[]
    }
  })

  data.forEach(p=>{
    if(p.orangtua_id && map[p.orangtua_id]){
      map[p.orangtua_id].children.push(map[p.id])
    }
  })

  const roots = data.filter(p=>!p.orangtua_id)

  return roots.map(r=>map[r.id])
}