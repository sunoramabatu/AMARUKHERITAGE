"use client";

export default function SearchBox({ onSearch }){
    

return (
  <div className="mt-4 flex justify-center">
    <input
      type="text"
      placeholder="🔍 Cari nama anggota..."
      className="w-full max-w-md px-4 py-2 rounded-lg border text-black"
      onChange={(e)=> onSearch(e.target.value)}
            onKeyDown={(e)=>{
            if(e.key==="Enter"){
                onSearch(e.target.value)
            }
            }}

    />
  </div>
)


}