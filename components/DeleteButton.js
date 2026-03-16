"use client";

import { supabase } from "../lib/supabase";

export default function DeleteButton({ id }) {

  const hapusAnggota = async () => {

    const konfirmasi = confirm("Yakin ingin menghapus anggota ini?");

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("anggota")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Gagal menghapus data");
      console.error(error);
      return;
    }

    alert("Anggota berhasil dihapus");

    // refresh halaman
    window.location.reload();
  };

  return (
    <button
      onClick={hapusAnggota}
      className="text-red-600 text-xs mt-2 hover:underline"
    >
      Hapus
    </button>
  );
}