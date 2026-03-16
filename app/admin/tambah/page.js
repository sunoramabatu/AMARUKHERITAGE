"use client"

import { useState } from "react"

export default function TambahAnggota() {

  const [nama,setNama] = useState("")
  const [jk,setJk] = useState("L")
  const [tahun,setTahun] = useState("")
  const [orangtua,setOrangtua] = useState("")

  const submit = async (e) => {
    e.preventDefault()

    const res = await fetch("/api/anggota",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        nama,
        jk,
        tahun,
        orangtua
      })
    })

    const data = await res.json()

    alert(data.message)
  }

  return (
    <div style={{padding:"40px"}}>

      <h1>Tambah Anggota Keluarga</h1>

      <form onSubmit={submit}>

        <p>Nama</p>
        <input
        value={nama}
        onChange={(e)=>setNama(e.target.value)}
        />

        <p>Jenis Kelamin</p>
        <select onChange={(e)=>setJk(e.target.value)}>
          <option value="L">Laki laki</option>
          <option value="P">Perempuan</option>
        </select>

        <p>Tahun Lahir</p>
        <input
        value={tahun}
        onChange={(e)=>setTahun(e.target.value)}
        />

        <p>ID Orang Tua</p>
        <input
        value={orangtua}
        onChange={(e)=>setOrangtua(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Tambah
        </button>

      </form>

    </div>
  )
}