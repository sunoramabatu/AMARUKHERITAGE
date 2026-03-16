"use client"

export default function PersonCard({person}){

return(

<div className="bg-white shadow rounded-xl w-44 p-3 text-center border border-green-700">

<div className="w-14 h-14 bg-gray-300 rounded-full mx-auto mb-2"/>

<div className="font-semibold">
{person.nama}
</div>

<div className="text-sm text-gray-500">
{person.tahun_lahir}
</div>

</div>

)

}