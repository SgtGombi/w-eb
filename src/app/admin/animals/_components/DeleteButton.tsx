"use client";

import { deleteAnimal } from "@/lib/actions/animal-actions";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <form
      action={deleteAnimal.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Biztosan törlöd ezt az állatot?")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-red-600 hover:underline text-sm">
        Törlés
      </button>
    </form>
  );
}
