import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { updateShelter } from "@/lib/actions/shelter-actions";
import ShelterFormFields from "../../_components/ShelterFormFields";

export default async function EditShelterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  const shelter = await prisma.shelter.findUnique({ where: { id: Number(id) } });
  if (!shelter) notFound();

  const action = updateShelter.bind(null, shelter.id);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Menhely szerkesztése: {shelter.name}</h1>

      <form action={action} className="bg-white border border-gray-200 rounded p-6">
        <ShelterFormFields defaultValues={shelter} />
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
