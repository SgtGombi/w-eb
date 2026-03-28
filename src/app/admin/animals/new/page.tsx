import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { createAnimal } from "@/lib/actions/animal-actions";
import AnimalFormFields from "../_components/AnimalFormFields";

export default async function NewAnimalPage() {
  const session = await auth();
  const role = session!.user.role;
  const shelterId = session!.user.shelter_id;

  const [animalTypes, shelters] = await Promise.all([
    prisma.animalType.findMany({ orderBy: { name: "asc" } }),
    role === "ADMIN" ? prisma.shelter.findMany({ orderBy: { name: "asc" } }) : [],
  ]);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Új állat hozzáadása</h1>

      <form action={createAnimal} className="bg-white border border-gray-200 rounded p-6">
        {/* Menhely */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Menhely *
          </label>
          {role === "ADMIN" ? (
            <select
              name="shelter_id"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Válassz...</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          ) : (
            <input type="hidden" name="shelter_id" value={shelterId ?? ""} />
          )}
        </div>

        <AnimalFormFields animalTypes={animalTypes} />

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
