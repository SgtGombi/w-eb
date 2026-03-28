"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAnimalType(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  await prisma.animalType.create({ data: { name } });
  revalidatePath("/admin/animal-types");
  redirect("/admin/animal-types");
}

export async function updateAnimalType(id: number, formData: FormData) {
  const name = (formData.get("name") as string).trim();
  await prisma.animalType.update({ where: { id }, data: { name } });
  revalidatePath("/admin/animal-types");
  redirect("/admin/animal-types");
}

export async function deleteAnimalType(id: number, _formData: FormData) {
  await prisma.animalType.delete({ where: { id } });
  revalidatePath("/admin/animal-types");
}
