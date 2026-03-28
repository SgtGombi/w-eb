"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function str(val: FormDataEntryValue | null): string | null {
  const s = (val as string)?.trim();
  return s ? s : null;
}

function optInt(val: FormDataEntryValue | null): number | null {
  const s = (val as string)?.trim();
  return s ? parseInt(s, 10) : null;
}

function optFloat(val: FormDataEntryValue | null): number | null {
  const s = (val as string)?.trim();
  return s ? parseFloat(s) : null;
}

function nullableBool(val: FormDataEntryValue | null): boolean | null {
  if (val === "true") return true;
  if (val === "false") return false;
  return null;
}

function optEnum<T>(val: FormDataEntryValue | null): T | null {
  const s = (val as string)?.trim();
  return s ? (s as unknown as T) : null;
}

function buildAnimalData(formData: FormData) {
  return {
    shelter_id: Number(formData.get("shelter_id")),
    type_id: Number(formData.get("type_id")),
    name: str(formData.get("name"))!,
    arrival_date: new Date(formData.get("arrival_date") as string),
    adoption_status: formData.get("adoption_status") as any,
    breed: str(formData.get("breed")),
    age: optInt(formData.get("age")),
    weight: optFloat(formData.get("weight")),
    size: optEnum<any>(formData.get("size")),
    gender: str(formData.get("gender")),
    color: str(formData.get("color")),
    energy_level: optEnum<any>(formData.get("energy_level")),
    in_or_out: optEnum<any>(formData.get("in_or_out")),
    kid_friendly: nullableBool(formData.get("kid_friendly")),
    dog_friendly: nullableBool(formData.get("dog_friendly")),
    pet_friendly: nullableBool(formData.get("pet_friendly")),
    vaccinated: nullableBool(formData.get("vaccinated")),
    neutered: nullableBool(formData.get("neutered")),
    microchipped: nullableBool(formData.get("microchipped")),
    special_needs: str(formData.get("special_needs")),
    description: str(formData.get("description")),
    active: formData.get("active") !== "false",
  };
}

export async function createAnimal(formData: FormData) {
  await prisma.animal.create({ data: buildAnimalData(formData) });
  revalidatePath("/admin/animals");
  redirect("/admin/animals");
}

export async function updateAnimal(id: number, formData: FormData) {
  await prisma.animal.update({ where: { id }, data: buildAnimalData(formData) });
  revalidatePath("/admin/animals");
  redirect("/admin/animals");
}

export async function deleteAnimal(id: number, _formData: FormData) {
  await prisma.animal.delete({ where: { id } });
  revalidatePath("/admin/animals");
}
