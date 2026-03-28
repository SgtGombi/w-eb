import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteAnimalTypeButton from "./_components/DeleteAnimalTypeButton";

export default async function AnimalTypesPage() {
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  const types = await prisma.animalType.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { animals: true } } },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Állat típusok</h1>
        <Link
          href="/admin/animal-types/new"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Új típus
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Név</th>
              <th className="text-left px-4 py-3 font-medium">Állatok száma</th>
              <th className="text-left px-4 py-3 font-medium">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {types.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-gray-500">{t._count.animals}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/animal-types/${t.id}/edit`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Szerkesztés
                    </Link>
                    <DeleteAnimalTypeButton id={t.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {types.length === 0 && (
          <p className="text-gray-500 text-sm p-6">Nincsenek típusok.</p>
        )}
      </div>
    </div>
  );
}
