"use client";

import { Suspense } from "react";
import TambahAnggotaClient from "./TambahAnggotaClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TambahAnggotaClient />
    </Suspense>
  );
}