"use client"

export const dynamic = "force-dynamic"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react";
import TambahAnggotaClient from "./TambahAnggotaClient";


export default function Page() {

  const params = useSearchParams()

  const pasanganId = params.get("pasangan")
  const orangtuaId = params.get("orangtua")

  const modeTambahPasangan = !!pasanganId
  const modeTambahAnak = !!orangtuaId

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TambahAnggotaClient />
    </Suspense>
  );
}