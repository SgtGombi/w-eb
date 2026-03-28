"use client";

import { updateProfile } from "@/lib/actions/profile-actions";
import { useState } from "react";

const field = "w-full border border-gray-300 rounded px-3 py-2 text-sm";
const label = "block text-sm font-medium text-gray-700 mb-1";

type Props = { adminId: number; name: string; phone: string };

export default function ProfileForm({ adminId, name, phone }: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password && password !== confirm) {
      setError("A két jelszó nem egyezik.");
      return;
    }

    try {
      await updateProfile(adminId, form);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message ?? "Hiba történt.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={label}>Név *</label>
          <input name="name" type="text" required defaultValue={name} className={field} />
        </div>
        <div className="col-span-2">
          <label className={label}>Telefonszám *</label>
          <input name="phone" type="text" required defaultValue={phone} className={field} />
        </div>
        <div>
          <label className={label}>Új jelszó</label>
          <input name="password" type="password" className={field} placeholder="Hagyja üresen ha nem változtat" />
        </div>
        <div>
          <label className={label}>Jelszó megerősítése</label>
          <input name="confirm" type="password" className={field} placeholder="Ismételje meg az új jelszót" />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="mt-4 text-sm text-green-600">Sikeresen mentve.</p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
        >
          Mentés
        </button>
      </div>
    </form>
  );
}
