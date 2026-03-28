"use client";

import { deleteAdmin } from "@/lib/actions/admin-actions";
import { deleteShelter } from "@/lib/actions/shelter-actions";

export function DeleteAdminButton({ id }: { id: number }) {
  return (
    <form
      action={deleteAdmin.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Biztosan törlöd ezt az admint?")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-red-600 hover:underline text-sm">
        Törlés
      </button>
    </form>
  );
}

export function DeleteShelterButton({ id }: { id: number }) {
  return (
    <form
      action={deleteShelter.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Biztosan törlöd ezt a menhelyet?")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-red-600 hover:underline text-sm">
        Törlés
      </button>
    </form>
  );
}
