import { auth, signOut } from "@auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Login oldal is a layout alá esik, ott ne rendereljük a sidebárt
  if (!session) {
    return <>{children}</>;
  }

  const role = session.user.role;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-700">
          <p className="font-semibold">{session.user.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{role}</p>
        </div>

        <nav className="flex flex-col p-3 gap-1 flex-1">
          <Link
            href="/admin"
            className="px-3 py-2 rounded hover:bg-gray-700 text-sm"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/animals"
            className="px-3 py-2 rounded hover:bg-gray-700 text-sm"
          >
            Állatok adatai
          </Link>
          {role === "ADMIN" && (
            <Link
              href="/admin/manage"
              className="px-3 py-2 rounded hover:bg-gray-700 text-sm"
            >
              Admin
            </Link>
          )}
          {role === "ADMIN" && (
            <Link
              href="/admin/animal-types"
              className="px-3 py-2 rounded hover:bg-gray-700 text-sm"
            >
              Állat típusok
            </Link>
          )}
          {role === "OWNER" && (
            <Link
              href="/admin/shelter"
              className="px-3 py-2 rounded hover:bg-gray-700 text-sm"
            >
              Menhely adatok
            </Link>
          )}
          <Link
            href="/admin/profile"
            className="px-3 py-2 rounded hover:bg-gray-700 text-sm"
          >
            Profilom
          </Link>
        </nav>

        <div className="p-3 border-t border-gray-700">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-sm text-red-400"
            >
              Kijelentkezés
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
