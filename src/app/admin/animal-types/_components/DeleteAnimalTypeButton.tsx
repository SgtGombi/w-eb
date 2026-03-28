"use client";

import { deleteAnimalType } from "@/lib/actions/animal-type-actions";

export default function DeleteAnimalTypeButton({ id }: { id: number }) {
  return (
    <form
      action={deleteAnimalType.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Biztosan törlöd ezt a típust?")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-red-600 hover:underline text-sm">
        Törlés
      </button>
    </form>
  );
}
