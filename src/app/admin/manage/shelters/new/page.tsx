import { auth } from "@auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createShelter } from "@/lib/actions/shelter-actions";
import ShelterFormFields from "../../_components/ShelterFormFields";

export default async function NewShelterPage() {
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Új menhely</h1>

      <form action={createShelter} className="bg-white border border-gray-200 rounded p-6">
        <ShelterFormFields />
        <div className="flex gap-3 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700">
            Mentés
          </button>
          <Link href="/admin/manage" className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Mégsem
          </Link>
        </div>
      </form>
    </div>
  );
}
