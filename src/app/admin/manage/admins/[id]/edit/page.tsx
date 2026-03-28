import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { updateAdmin } from "@/lib/actions/admin-actions";

const field = "w-full border border-gray-300 rounded px-3 py-2 text-sm";
const label = "block text-sm font-medium text-gray-700 mb-1";

export default async function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  const [admin, shelters] = await Promise.all([
    prisma.admin.findUnique({ where: { id: Number(id) } }),
    prisma.shelter.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!admin) notFound();

  const action = updateAdmin.bind(null, admin.id);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Admin szerkesztése: {admin.name}</h1>

      <form action={action} className="bg-white border border-gray-200 rounded p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={label}>Név *</label>
            <input name="name" type="text" required defaultValue={admin.name} className={field} />
          </div>
          <div>
            <label className={label}>Email *</label>
            <input name="email" type="email" required defaultValue={admin.email} className={field} />
          </div>
          <div>
            <label className={label}>Telefon *</label>
            <input name="phone" type="text" required defaultValue={admin.phone} className={field} />
          </div>
          <div className="col-span-2">
            <label className={label}>Új jelszó (ha üres, nem változik)</label>
            <input name="password" type="password" className={field} placeholder="Hagyja üresen a megtartáshoz" />
          </div>
          <div>
            <label className={label}>Role *</label>
            <select name="role" required defaultValue={admin.role} className={field}>
              <option value="ADMIN">ADMIN</option>
              <option value="OWNER">OWNER</option>
              <option value="CARETAKER">CARETAKER</option>
            </select>
          </div>
          <div>
            <label className={label}>Menhely</label>
            <select name="shelter_id" defaultValue={admin.shelter_id ?? ""} className={field}>
              <option value="">–</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Aktív</label>
            <select name="active" defaultValue={admin.active ? "true" : "false"} className={field}>
              <option value="true">Igen</option>
              <option value="false">Nem</option>
            </select>
          </div>
        </div>

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
