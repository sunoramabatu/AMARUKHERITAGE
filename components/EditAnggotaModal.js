"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadPhoto } from "../lib/uploadPhoto";
import cropImage from "../lib/cropImage";
import PhotoCropper from "../components/PhotoCropper";

export default function EditAnggotaModal({ anggota, onClose }) {

const [nama,setNama] = useState(anggota?.nama || "");
const [tahun,setTahun] = useState(anggota?.tahun_lahir || "");
const [jk,setJk] = useState(anggota?.jk || "L");
const [preview,setPreview] = useState(anggota?.foto || "/avatar.png");
const [file,setFile] = useState(null);
const [imageSrc,setImageSrc] = useState(null);
const [croppedBlob,setCroppedBlob] = useState(null);

function handleFile(e){

const file = e.target.files[0];
if(!file) return;

const reader = new FileReader();

reader.onload = ()=>{
setImageSrc(reader.result);
};

reader.readAsDataURL(file);

}

async function handleCropComplete(cropArea){

const blob = await cropImage(imageSrc,cropArea);

setCroppedBlob(blob);

setPreview(URL.createObjectURL(blob));

setImageSrc(null);

}

<div className="flex gap-3 mt-4">

<button
onClick={simpan}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Simpan
</button>

<button
onClick={onClose}
className="bg-gray-500 text-white px-4 py-2 rounded"
>
Tutup
</button>

<button
onClick={hapusAnggota}
className="bg-red-600 text-white px-4 py-2 rounded ml-auto"
>
Hapus Anggota
</button>

</div>

async function hapusAnggota(){

const konfirmasi = confirm("Yakin ingin menghapus anggota ini?");

if(!konfirmasi) return;

const { error } = await supabase
.from("anggota")
.delete()
.eq("id", anggota.id);

if(error){
console.log(error);
alert("Gagal menghapus anggota");
return;
}

location.reload();

}

async function simpan(){

let fotoUrl = anggota.foto;

if(croppedBlob){

fotoUrl = await uploadPhoto(croppedBlob, anggota.id);

}


const { error } = await supabase
.from("anggota")
.update({
nama: nama,
tahun_lahir: parseInt(tahun),
jk: jk,
foto: fotoUrl
})
.eq("id", anggota.id);

if(error){
console.log(error);
alert(error.message);
return;
}

location.reload();

}

function tambahPasangan(){

window.location.href = `/tambah?pasangan=${anggota.id}`;

}

function tambahAnak(){

window.location.href = `/tambah?orangtua=${anggota.id}`;

}

return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl w-[420px]">

<h2 className="text-xl font-bold mb-5">
Edit Anggota
</h2>

{/* FOTO */}

<label className="font-semibold block mb-2">
Foto Anggota
</label>

<img
src={preview}
className="w-28 h-28 object-cover rounded mb-3 border"
/>

<label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer inline-block">

Pilih Foto Baru

<input
type="file"
accept="image/*"
onChange={handleFile}
className="hidden"
/>

</label>

{/* NAMA */}

<label className="font-semibold block mb-1">
Nama Anggota
</label>

<input
className="border p-2 w-full mb-4 rounded"
value={nama}
onChange={(e)=>setNama(e.target.value)}
/>

{/* TAHUN */}

<label className="font-semibold block mb-1">
Tahun Lahir
</label>

<input
type="number"
className="border p-2 w-full mb-4 rounded"
value={tahun}
onChange={(e)=>setTahun(e.target.value)}
/>

{/* JENIS KELAMIN */}

<label className="font-semibold block mb-1">
Jenis Kelamin
</label>

<select
className="border p-2 w-full mb-5 rounded"
value={jk}
onChange={(e)=>setJk(e.target.value)}
>
<option value="L">Laki-laki</option>
<option value="P">Perempuan</option>
</select>

<div className="flex gap-3 mt-4">



</div>

<div className="flex gap-2 mt-3">

<button
onClick={tambahAnak}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Tambah Anak
</button>

<button
onClick={tambahPasangan}
className="bg-purple-600 text-white px-4 py-2 rounded"
>
Tambah Pasangan
</button>

</div>

<button
onClick={hapusAnggota}
className="bg-red-600 text-white px-4 py-2 rounded ml-auto"
>
Hapus Anggota
</button>

<button
onClick={simpan}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Simpan
</button>

<button
onClick={onClose}
className="bg-gray-500 text-white px-4 py-2 rounded"
>
Tutup
</button>

</div>

{imageSrc && (

<PhotoCropper
image={imageSrc}
onComplete={handleCropComplete}
/>

)}
</div>

);

}