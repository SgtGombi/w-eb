import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./_components/DeleteButton";

export default async function AnimalsPage() {
  const session = await auth();
  const role = session!.user.role;
  const shelterId = session!.user.shelter_id;

  const animals = await prisma.animal.findMany({
    where: role === "ADMIN" ? undefined : { shelter_id: shelterId ?? -1 },
    include: { shelter: true, type: true },
    orderBy: { created_at: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Állatok</h1>
        <Link
          href="/admin/animals/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Új állat
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Név</th>
              <th className="text-left px-4 py-3 font-medium">Típus</th>
              {role === "ADMIN" && (
                <th className="text-left px-4 py-3 font-medium">Menhely</th>
              )}
              <th className="text-left px-4 py-3 font-medium">Státusz</th>
              <th className="text-left px-4 py-3 font-medium">Aktív</th>
              <th className="text-left px-4 py-3 font-medium">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{animal.name}</td>
                <td className="px-4 py-3">{animal.type.name}</td>
                {role === "ADMIN" && (
                  <td className="px-4 py-3">{animal.shelter.name}</td>
                )}
                <td className="px-4 py-3">{animal.adoption_status}</td>
                <td className="px-4 py-3">{animal.active ? "✓" : "✗"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/animals/${animal.id}/edit`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Szerkesztés
                    </Link>
                    <DeleteButton id={animal.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {animals.length === 0 && (
          <p className="text-gray-500 text-sm p-6">Nincsenek állatok.</p>
        )}
      </div>
    </div>
  );
}
