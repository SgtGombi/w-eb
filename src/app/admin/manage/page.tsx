import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteAdminButton, DeleteShelterButton } from "./_components/DeleteButtons";

export default async function ManagePage() {
  const session = await auth();
  if (session!.user.role !== "ADMIN") redirect("/admin");

  const [admins, shelters] = await Promise.all([
    prisma.admin.findMany({
      include: { shelter: { select: { name: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.shelter.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-12">

      {/* ── ADMINOK ─────────────────────────────── */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Adminok</h2>
          <Link
            href="/admin/manage/admins/new"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            + Új admin
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Név</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium">Menhely</th>
                <th className="text-left px-4 py-3 font-medium">Aktív</th>
                <th className="text-left px-4 py-3 font-medium">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{a.name}</td>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">{a.role}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{a.shelter?.name ?? "–"}</td>
                  <td className="px-4 py-3">{a.active ? "✓" : "✗"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/admin/manage/admins/${a.id}/edit`} className="text-blue-600 hover:underline text-sm">
                        Szerkesztés
                      </Link>
                      <DeleteAdminButton id={a.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {admins.length === 0 && <p className="text-gray-500 text-sm p-6">Nincsenek adminok.</p>}
        </div>
      </section>

      {/* ── MENHELYEK ───────────────────────────── */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Menhelyek</h2>
          <Link
            href="/admin/manage/shelters/new"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            + Új menhely
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Név</th>
                <th className="text-left px-4 py-3 font-medium">Város</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Weboldal</th>
                <th className="text-left px-4 py-3 font-medium">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {shelters.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.city}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3 text-gray-500">{s.website ?? "–"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/admin/manage/shelters/${s.id}/edit`} className="text-blue-600 hover:underline text-sm">
                        Szerkesztés
                      </Link>
                      <DeleteShelterButton id={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shelters.length === 0 && <p className="text-gray-500 text-sm p-6">Nincsenek menhelyek.</p>}
        </div>
      </section>

    </div>
  );
}
