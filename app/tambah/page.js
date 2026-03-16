"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import TambahAnggotaClient from "./TambahAnggotaClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TambahAnggotaClient />
    </Suspense>
  );
}