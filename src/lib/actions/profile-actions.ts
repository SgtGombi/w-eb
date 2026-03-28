"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateProfile(adminId: number, formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const password = (formData.get("password") as string).trim();
  const confirm = (formData.get("confirm") as string).trim();

  const data: any = { name, phone };

  if (password) {
    if (password !== confirm) {
      throw new Error("A két jelszó nem egyezik.");
    }
    data.password = await bcrypt.hash(password, 12);
  }

  await prisma.admin.update({ where: { id: adminId }, data });
  revalidatePath("/admin/profile");
}
