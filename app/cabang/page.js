import Link from "next/link";
import { keluarga } from "../../data/keluarga";

export default function Cabang() {

  const generasi2 = keluarga.filter(
    (o) => o.generasi === 2
  );

  return (
    <div className="min-h-screen bg-[#F4EFE6] p-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        Cabang Keluarga
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

        {generasi2.map((orang) => (
          <Link
            key={orang.id}
            href={`/cabang/${orang.id}`}
          >
            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition cursor-pointer">

              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>

              <h2 className="text-center font-semibold mt-4">
                Cabang {orang.nama}
              </h2>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}