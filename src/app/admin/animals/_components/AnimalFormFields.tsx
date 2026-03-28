import type { Animal } from "@/generated/prisma/client";

type AnimalType = { id: number; name: string };

type Props = {
  animalTypes: AnimalType[];
  defaultValues?: Partial<Animal>;
};

const field = "w-full border border-gray-300 rounded px-3 py-2 text-sm";
const label = "block text-sm font-medium text-gray-700 mb-1";

function NullableBoolSelect({ name, defaultValue }: { name: string; defaultValue?: boolean | null }) {
  const val = defaultValue === true ? "true" : defaultValue === false ? "false" : "";
  return (
    <select name={name} defaultValue={val} className={field}>
      <option value="">Nem megadott</option>
      <option value="true">Igen</option>
      <option value="false">Nem</option>
    </select>
  );
}

export default function AnimalFormFields({ animalTypes, defaultValues }: Props) {
  const dv = defaultValues ?? {};
  const arrivalDate = dv.arrival_date
    ? new Date(dv.arrival_date).toISOString().split("T")[0]
    : "";

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Név */}
      <div className="col-span-2">
        <label className={label}>Név *</label>
        <input name="name" type="text" required defaultValue={dv.name ?? ""} className={field} />
      </div>

      {/* Típus */}
      <div>
        <label className={label}>Típus *</label>
        <select name="type_id" required defaultValue={dv.type_id ?? ""} className={field}>
          <option value="">Válassz...</option>
          {animalTypes.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Érkezés dátuma */}
      <div>
        <label className={label}>Érkezés dátuma *</label>
        <input name="arrival_date" type="date" required defaultValue={arrivalDate} className={field} />
      </div>

      {/* Befogadási státusz */}
      <div>
        <label className={label}>Befogadási státusz *</label>
        <select name="adoption_status" required defaultValue={dv.adoption_status ?? "AVAILABLE"} className={field}>
          <option value="AVAILABLE">Elérhető</option>
          <option value="PENDING">Folyamatban</option>
          <option value="ADOPTED">Örökbefogadva</option>
        </select>
      </div>

      {/* Fajta */}
      <div>
        <label className={label}>Fajta</label>
        <input name="breed" type="text" defaultValue={dv.breed ?? ""} className={field} />
      </div>

      {/* Kor */}
      <div>
        <label className={label}>Kor (év)</label>
        <input name="age" type="number" min="0" defaultValue={dv.age ?? ""} className={field} />
      </div>

      {/* Súly */}
      <div>
        <label className={label}>Súly (kg)</label>
        <input name="weight" type="number" step="0.1" min="0" defaultValue={dv.weight ?? ""} className={field} />
      </div>

      {/* Méret */}
      <div>
        <label className={label}>Méret</label>
        <select name="size" defaultValue={dv.size ?? ""} className={field}>
          <option value="">Nem megadott</option>
          <option value="SMALL">Kis</option>
          <option value="MEDIUM">Közepes</option>
          <option value="LARGE">Nagy</option>
          <option value="XLARGE">Extra nagy</option>
        </select>
      </div>

      {/* Nem */}
      <div>
        <label className={label}>Nem</label>
        <input name="gender" type="text" defaultValue={dv.gender ?? ""} className={field} />
      </div>

      {/* Szín */}
      <div>
        <label className={label}>Szín</label>
        <input name="color" type="text" defaultValue={dv.color ?? ""} className={field} />
      </div>

      {/* Energiaszint */}
      <div>
        <label className={label}>Energiaszint</label>
        <select name="energy_level" defaultValue={dv.energy_level ?? ""} className={field}>
          <option value="">Nem megadott</option>
          <option value="LOW">Alacsony</option>
          <option value="MEDIUM">Közepes</option>
          <option value="HIGH">Magas</option>
        </select>
      </div>

      {/* Benti/kinti */}
      <div>
        <label className={label}>Tartás</label>
        <select name="in_or_out" defaultValue={dv.in_or_out ?? ""} className={field}>
          <option value="">Nem megadott</option>
          <option value="IN">Benti</option>
          <option value="OUT">Kinti</option>
          <option value="BOTH">Mindkettő</option>
        </select>
      </div>

      {/* Nullable boolok */}
      <div>
        <label className={label}>Gyerekbarát</label>
        <NullableBoolSelect name="kid_friendly" defaultValue={dv.kid_friendly} />
      </div>
      <div>
        <label className={label}>Kutyabarát</label>
        <NullableBoolSelect name="dog_friendly" defaultValue={dv.dog_friendly} />
      </div>
      <div>
        <label className={label}>Állatbarát</label>
        <NullableBoolSelect name="pet_friendly" defaultValue={dv.pet_friendly} />
      </div>
      <div>
        <label className={label}>Oltott</label>
        <NullableBoolSelect name="vaccinated" defaultValue={dv.vaccinated} />
      </div>
      <div>
        <label className={label}>Ivartalanított</label>
        <NullableBoolSelect name="neutered" defaultValue={dv.neutered} />
      </div>
      <div>
        <label className={label}>Csipezett</label>
        <NullableBoolSelect name="microchipped" defaultValue={dv.microchipped} />
      </div>

      {/* Aktív */}
      <div>
        <label className={label}>Aktív</label>
        <select name="active" defaultValue={dv.active === false ? "false" : "true"} className={field}>
          <option value="true">Igen</option>
          <option value="false">Nem</option>
        </select>
      </div>

      {/* Különleges igények */}
      <div className="col-span-2">
        <label className={label}>Különleges igények</label>
        <input name="special_needs" type="text" defaultValue={dv.special_needs ?? ""} className={field} />
      </div>

      {/* Leírás */}
      <div className="col-span-2">
        <label className={label}>Leírás</label>
        <textarea name="description" rows={4} defaultValue={dv.description ?? ""} className={field} />
      </div>
    </div>
  );
}
