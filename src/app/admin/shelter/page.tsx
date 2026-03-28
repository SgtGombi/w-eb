import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { updateShelter } from "@/lib/actions/shelter-actions";

const field = "w-full border border-gray-300 rounded px-3 py-2 text-sm";
const label = "block text-sm font-medium text-gray-700 mb-1";

export default async function ShelterPage() {
  const session = await auth();

  if (session!.user.role !== "OWNER") redirect("/admin");

  const admin = await prisma.admin.findUnique({
    where: { id: Number(session!.user.id) },
    include: { shelter: true },
  });

  if (!admin?.shelter) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Menhely adatok</h1>
        <p className="text-gray-500">Nincs hozzárendelt menhely a fiókodhoz.</p>
      </div>
    );
  }

  const shelter = admin.shelter;
  const action = updateShelter.bind(null, shelter.id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Menhely adatok</h1>

      <form action={action} className="bg-white border border-gray-200 rounded p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={label}>Menhely neve *</label>
            <input name="name" type="text" required defaultValue={shelter.name} className={field} />
          </div>

          <div>
            <label className={label}>Irányítószám *</label>
            <input name="zip_code" type="number" required defaultValue={shelter.zip_code} className={field} />
          </div>

          <div>
            <label className={label}>Megye *</label>
            <input name="county" type="text" required defaultValue={shelter.county} className={field} />
          </div>

          <div>
            <label className={label}>Város *</label>
            <input name="city" type="text" required defaultValue={shelter.city} className={field} />
          </div>

          <div>
            <label className={label}>Cím *</label>
            <input name="address" type="text" required defaultValue={shelter.address} className={field} />
          </div>

          <div>
            <label className={label}>Email *</label>
            <input name="email" type="email" required defaultValue={shelter.email} className={field} />
          </div>

          <div>
            <label className={label}>Weboldal</label>
            <input name="website" type="text" defaultValue={shelter.website ?? ""} className={field} />
          </div>

          <div className="col-span-2">
            <label className={label}>Kép URL</label>
            <input name="image" type="text" defaultValue={shelter.image ?? ""} className={field} />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
          >
            Mentés
          </button>
        </div>
      </form>
    </div>
  );
}
