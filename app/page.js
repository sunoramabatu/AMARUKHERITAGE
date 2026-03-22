import { supabase } from "../lib/supabase";
import Link from "next/link";
import FamilyTreeWrapper from "../components/FamilyTreeWrapper";
import SearchBox from "../components/SearchBox";
import { useState } from "react";


export const dynamic = "force-dynamic";

export default async function Home() {

  const [keyword, setKeyword] = useState("");

  const { data: keluarga } = await supabase
    .from("anggota")
    .select("*");

  const totalAnggota = keluarga?.length || 0;

  const totalGenerasi =
    keluarga?.length > 0
      ? Math.max(...keluarga.map((a) => a.generasi))
      : 0;

  return (
    <div className="min-h-screen bg-[#F4EFE6]">

      <header className="bg-[#66BB6A] text-white py-6">
        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold">
            Jejak Keluarga Amari Rukmini
          </h3>

          <p className="text-sm mt-1">
            {totalGenerasi} Generasi • {totalAnggota} Anggota
          </p>

          <h1 className="text-3xl font-bold">
            UNTUK TAMBAH ANGGOTA KELUARGA, MASUKKAN DARI GARIS KETURUNAN AMARI RUKMINI
          </h1>
          

          <SearchBox/>
          <FamilyTreeWrapper keluarga={keluarga} keyword={keyword} />

          <div className="hidden">

            <Link
              href="/cabang"
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              Cabang Keluarga
            </Link>

            <Link
              href="/tambah"
              className="bg-green-600 px-4 py-2 rounded-lg"
            >
              Tambah Anggota
            </Link>

          </div>

          

        </div>
      </header>

      <main className="w-screen h-[calc(100vh-120px)]">

        <FamilyTreeWrapper keluarga={keluarga} />

      </main>

    </div>
  );
}