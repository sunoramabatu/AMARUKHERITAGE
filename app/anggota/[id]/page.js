import { keluarga } from "../../../data/keluarga";

export default async function Profil({ params }) {

    const { id } = await params;
    const idNumber = parseInt(id);

  const orang = keluarga.find((o) => o.id === idNumber);

  if (!orang) {
    return (
      <div className="p-10">
        Data tidak ditemukan. ID: {params.id}
      </div>
    );
  }

  const pasangan = keluarga.find(
    (o) => o.id === orang.pasangan
  );

  const anak = keluarga.filter(
    (o) => orang.anak?.includes(o.id)
  );

  return (
    <div className="min-h-screen bg-[#F4EFE6] p-10">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">

        <div className="text-center">

          <div className="w-28 h-28 bg-gray-300 rounded-full mx-auto"></div>

          <h1 className="text-2xl font-bold mt-4">
            {orang.nama}
          </h1>

          <p className="text-gray-500">
            Generasi {orang.generasi}
          </p>

          <p className="mt-2">
            {orang.lahir} {orang.wafat ? `- ${orang.wafat}` : ""}
          </p>

        </div>

        {pasangan && (
          <div className="mt-6">
            <h2 className="font-semibold">Pasangan</h2>
            <p>{pasangan.nama}</p>
          </div>
        )}

        {anak.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold">Anak</h2>

            <ul className="list-disc ml-5">
              {anak.map((a) => (
                <li key={a.id}>{a.nama}</li>
              ))}
            </ul>

          </div>
        )}

      </div>

    </div>
  );
}