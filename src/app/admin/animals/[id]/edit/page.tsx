import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateAnimal } from "@/lib/actions/animal-actions";
import AnimalFormFields from "../../_components/AnimalFormFields";

export default async function EditAnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const role = session!.user.role;
  const shelterId = session!.user.shelter_id;

  const [animal, animalTypes, shelters] = await Promise.all([
    prisma.animal.findUnique({ where: { id: Number(id) } }),
    prisma.animalType.findMany({ orderBy: { name: "asc" } }),
    role === "ADMIN" ? prisma.shelter.findMany({ orderBy: { name: "asc" } }) : [],
  ]);

  if (!animal) notFound();

  // OWNER/CARETAKER csak a saját shelterük állatát szerkesztheti
  if (role !== "ADMIN" && animal.shelter_id !== shelterId) notFound();

  const action = updateAnimal.bind(null, animal.id);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Állat szerkesztése: {animal.name}</h1>

      <form action={action} className="bg-white border border-gray-200 rounded p-6">
        {/* Menhely */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Menhely *
          </label>
          {role === "ADMIN" ? (
            <select
              name="shelter_id"
              required
              defaultValue={animal.shelter_id}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          ) : (
            <input type="hidden" name="shelter_id" value={animal.shelter_id} />
          )}
        </div>

        <AnimalFormFields animalTypes={animalTypes} defaultValues={animal} />

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
          >
            Mentés
          </button>
          <Link
            href="/admin/animals"
            className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Mégsem
          </Link>
        </div>
      </form>
    </div>
  );
}
