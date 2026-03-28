import { auth } from "@auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createAnimalType } from "@/lib/actions/animal-type-actions";

export default async function NewAnimalTypePage() {
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Új állat típus</h1>

      <form action={createAnimalType} className="bg-white border border-gray-200 rounded p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Típus neve *
          </label>
          <input
            name="name"
            type="text"
            required
            autoFocus
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="pl. Kutya"
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
