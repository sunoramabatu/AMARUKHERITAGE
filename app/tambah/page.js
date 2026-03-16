"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react";
import TambahAnggotaClient from "./TambahAnggotaClient";

export const dynamic = "force-dynamic";

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