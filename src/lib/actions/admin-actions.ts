"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function createAdmin(formData: FormData) {
  const password = (formData.get("password") as string).trim();
  const hash = await bcrypt.hash(password, 12);
  const shelterId = formData.get("shelter_id");

  await prisma.admin.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: hash,
      role: formData.get("role") as any,
      phone: formData.get("phone") as string,
      active: formData.get("active") !== "false",
      shelter_id: shelterId ? Number(shelterId) : null,
    },
  });
  revalidatePath("/admin/manage");
  redirect("/admin/manage");
}

export async function updateAdmin(id: number, formData: FormData) {
  const password = (formData.get("password") as string).trim();
  const shelterId = formData.get("shelter_id");

  const data: any = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as any,
    phone: formData.get("phone") as string,
    active: formData.get("active") !== "false",
    shelter_id: shelterId ? Number(shelterId) : null,
  };

  if (password) {
    data.password = await bcrypt.hash(password, 12);
  }

  await prisma.admin.update({ where: { id }, data });
  revalidatePath("/admin/manage");
  redirect("/admin/manage");
}

export async function deleteAdmin(id: number, _formData: FormData) {
  await prisma.admin.delete({ where: { id } });
  revalidatePath("/admin/manage");
}
