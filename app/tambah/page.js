import { Suspense } from "react";
import TambahAnggotaClient from "./TambahAnggotaClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TambahAnggotaClient />
    </Suspense>
  );
}