"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { uploadPhoto } from "../../lib/uploadPhoto";
import cropImage from "../../lib/cropImage";
import PhotoCropper from "../../components/PhotoCropper";
import { useSearchParams } from "next/navigation";

export default function TambahAnggota() {

  const [nama, setNama] = useState("");
  const [jk, setJk] = useState("L");
  const [tahunLahir, setTahunLahir] = useState("");
  const [daftarOrangtua, setDaftarOrangtua] = useState([]);
  const [imageSrc,setImageSrc] = useState(null);
  const [croppedBlob,setCroppedBlob] = useState(null);
  const [preview,setPreview] = useState(null);
  const [orangtuaId,setOrangtuaId] = useState("");
  const [pasanganId,setPasanganId] = useState("");
  const [ayahId,setAyahId] = useState("")
  const [ibuId,setIbuId] = useState("")

  const params = useSearchParams();

    useEffect(() => {

      const orangtua = params.get("orangtua");
      const pasangan = params.get("pasangan");

      if(orangtua) setOrangtuaId(orangtua);
      if(pasangan) setPasanganId(pasangan);

    }, [params]);
  
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

    setImageSrc(null);

    // preview foto hasil crop
    const preview = URL.createObjectURL(blob);
    setPreview(preview);

    }


  useEffect(() => {
    ambilOrangtua();
  }, []);

  async function ambilOrangtua() {
    const { data } = await supabase
      .from("anggota")
      .select("id,nama,generasi");

    setDaftarOrangtua(data || []);
  }

    async function handleSubmit(e) {
e.preventDefault();

let generasiBaru = 1;

if (orangtuaId) {
const { data: ortu } = await supabase
.from("anggota")
.select("generasi")
.eq("id", orangtuaId)
.single();

if (ortu) generasiBaru = ortu.generasi + 1;
}

// INSERT anggota dulu
const { data, error } = await supabase
.from("anggota")
.insert([
{
nama: nama,
jk: jk,
tahun_lahir: parseInt(tahunLahir),
ayah_id: ayahId || null,
ibu_id: ibuId || null,
pasangan_id: pasanganId || null,
generasi: generasiBaru
}
])
.select()
.single();

if (error) {
alert("Gagal simpan");
console.log(error);
return;
}

// Upload foto jika ada
if(croppedBlob){

const url = await uploadPhoto(croppedBlob,data.id);

await supabase
.from("anggota")
.update({foto:url})
.eq("id",data.id);

}

alert("Berhasil disimpan");
window.location.href="/";

}


  return (
    <div className="min-h-screen bg-[#F4EFE6] p-4 overflow-y-auto">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Tambah Anggota Keluarga
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Nama"
            className="w-full border p-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />

          <select
            className="w-full border p-2 rounded"
            value={jk}
            onChange={(e) => setJk(e.target.value)}
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>

          <input
            type="number"
            placeholder="Tahun Lahir"
            className="w-full border p-2 rounded"
            value={tahunLahir}
            onChange={(e) => setTahunLahir(e.target.value)}
          />

          {/* PILIH ORANG TUA */}

          <select
            className="w-full border p-2 rounded"
            value={ayahId}
            onChange={(e)=>setAyahId(e.target.value)}
            >

            <option value="">Pilih Ayah</option>

            {daftarOrangtua
            .filter(o=>o.jk==="L")
            .map(o=>(
            <option key={o.id} value={o.id}>
            {o.nama}
            </option>
            ))}

            </select>

            <select
                className="w-full border p-2 rounded"
                value={ayahId}
                onChange={(e)=>setAyahId(e.target.value)}
                >

                <option value="">Pilih Ayah</option>

                {daftarOrangtua
                .filter(o=>o.jk==="L")
                .map(o=>(
                <option key={o.id} value={o.id}>
                {o.nama}
                </option>
                ))}

                </select>

          {/* PILIH PASANGAN */}

           {pasanganId && (
              <p className="text-sm text-gray-600 mb-2">
              Menambahkan pasangan untuk anggota yang dipilih
              </p>
              )}

          <select
            className="w-full border p-2 rounded"
            value={pasanganId}
            onChange={(e) => setPasanganId(e.target.value)}
          >

            <option value="">Nama Pasangan</option>

              {daftarOrangtua.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nama}
              </option>
            ))}

          </select>

         <div className="mb-4">

            <label className="block mb-2 font-semibold">
            Foto Anggota
            </label>

            <img
            src={preview || "/avatar.png"}
            className="w-32 h-32 object-cover rounded border mb-3"
            />

            <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => document.getElementById("uploadFoto").click()}
            >
            Pilih Foto
            </button>

            <input
            id="uploadFoto"
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            />

            </div>

          {preview && (
          <img
          src={preview}
          className="w-32 h-32 object-cover rounded mb-3"
          />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg mt-6 mb-20 hover:bg-green-700"
            >
            Simpan Anggota
            </button>

          {imageSrc && (

            <PhotoCropper
            image={imageSrc}
            onComplete={handleCropComplete}
            />

          )}

        </form>

      </div>

    </div>
  );
}