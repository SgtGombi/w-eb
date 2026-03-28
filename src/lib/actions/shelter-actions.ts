"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function shelterData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    zip_code: Number(formData.get("zip_code")),
    county: formData.get("county") as string,
    city: formData.get("city") as string,
    address: formData.get("address") as string,
    email: formData.get("email") as string,
    image: (formData.get("image") as string) || null,
    website: (formData.get("website") as string) || null,
  };
}

export async function createShelter(formData: FormData) {
  await prisma.shelter.create({ data: shelterData(formData) });
  revalidatePath("/admin/manage");
  redirect("/admin/manage");
}

export async function updateShelter(id: number, formData: FormData) {
  await prisma.shelter.update({ where: { id }, data: shelterData(formData) });
  revalidatePath("/admin/manage");
  revalidatePath("/admin/shelter");
  redirect("/admin/manage");
}

export async function deleteShelter(id: number, _formData: FormData) {
  await prisma.shelter.delete({ where: { id } });
  revalidatePath("/admin/manage");
}

