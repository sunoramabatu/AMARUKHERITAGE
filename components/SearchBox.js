"use client";

export default function SearchBox(){

return (
  <div className="mt-4 flex justify-center">
    <input
      type="text"
      placeholder="🔍 Cari nama anggota..."
      className="w-full max-w-md px-4 py-2 rounded-lg border text-black"
      onChange={(e)=>{
        window.dispatchEvent(
          new CustomEvent("searchKeluarga",{
            detail:e.target.value
          })
        )
      }}
    />
  </div>
)

}