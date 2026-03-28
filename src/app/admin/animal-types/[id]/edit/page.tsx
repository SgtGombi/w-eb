import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { updateAnimalType } from "@/lib/actions/animal-type-actions";

export default async function EditAnimalTypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  const type = await prisma.animalType.findUnique({ where: { id: Number(id) } });
  if (!type) notFound();

  const action = updateAnimalType.bind(null, type.id);

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Típus szerkesztése</h1>

      <form action={action} className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Típus neve *
          </label>
          <input
            name="name"
            type="text"
            required
            defaultValue={type.name}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
          >
            Mentés
          </button>
          <Link
            href="/admin/animal-types"
            className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Mégsem
          </Link>
        </div>
      </form>
    </div>
  );
}
