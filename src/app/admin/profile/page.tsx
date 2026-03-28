import { auth } from "@auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "./_components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const admin = await prisma.admin.findUnique({
    where: { id: Number(session.user.id) },
    select: { id: true, name: true, phone: true, email: true, role: true },
  });

  if (!admin) redirect("/admin/login");

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Profilom</h1>
      <p className="text-sm text-gray-500 mb-6">{admin.email} · {admin.role}</p>
      <ProfileForm adminId={admin.id} name={admin.name} phone={admin.phone} />
    </div>
  );
}
