import { auth } from "@auth";
import { AdminDataProvider, type AdminBaseData } from "@/admin/context/AdminDataContext";
import { SidebarProvider } from "@/admin/context/SidebarContext";
import { ThemeProvider } from "@/admin/context/ThemeContext";
import { prisma } from "@/lib/prisma";
import React from "react";

async function getAdminBaseData(): Promise<AdminBaseData> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const adminId = Number(userId);
  if (Number.isNaN(adminId)) {
    return null;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      shelter_id: true,
      shelter: {
        select: {
          name: true,
        },
      },
      name: true,
      email: true,
      role: true,
      phone: true,
    },
  });

  if (!admin) {
    return null;
  }

  return {
    id: admin.id,
    shelter_id: admin.shelter_id,
    shelter_name: admin.shelter?.name ?? null,
    name: admin.name,
    email: admin.email,
    role: String(admin.role),
    phone: admin.phone,
  };
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminData = await getAdminBaseData();

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminDataProvider value={adminData}>{children}</AdminDataProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
