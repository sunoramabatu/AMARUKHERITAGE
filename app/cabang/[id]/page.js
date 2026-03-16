import { keluarga } from "../../../data/keluarga";

export default async function CabangDetail({ params }) {

  const { id } = await params;
  const idNumber = parseInt(id);

  const kepala = keluarga.find(
    (o) => o.id === idNumber
  );

  const anak = keluarga.filter(
    (o) => o.orangtua?.includes(idNumber)
  );

  return (
    <div className="min-h-screen bg-[#F4EFE6] p-10">

      <h1 className="text-3xl font-bold text-center">
        Cabang {kepala?.nama}
      </h1>

      <div className="mt-10 text-center">

        <div className="w-28 h-28 bg-gray-300 rounded-full mx-auto"></div>

        <h2 className="text-xl font-semibold mt-3">
          {kepala?.nama}
        </h2>

      </div>

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-4">
          Anak-anak
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {anak.map((a) => (
            <div
              key={a.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              {a.nama}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}