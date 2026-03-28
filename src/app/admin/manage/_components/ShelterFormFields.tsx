import type { Shelter } from "@/generated/prisma/client";

type Props = { defaultValues?: Partial<Shelter> };
const field = "w-full border border-gray-300 rounded px-3 py-2 text-sm";
const label = "block text-sm font-medium text-gray-700 mb-1";

export default function ShelterFormFields({ defaultValues: dv = {} }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className={label}>Menhely neve *</label>
        <input name="name" type="text" required defaultValue={dv.name ?? ""} className={field} />
      </div>
      <div>
        <label className={label}>Irányítószám *</label>
        <input name="zip_code" type="number" required defaultValue={dv.zip_code ?? ""} className={field} />
      </div>
      <div>
        <label className={label}>Megye *</label>
        <input name="county" type="text" required defaultValue={dv.county ?? ""} className={field} />
      </div>
      <div>
        <label className={label}>Város *</label>
        <input name="city" type="text" required defaultValue={dv.city ?? ""} className={field} />
      </div>
      <div>
        <label className={label}>Cím *</label>
        <input name="address" type="text" required defaultValue={dv.address ?? ""} className={field} />
      </div>
      <div>
        <label className={label}>Email *</label>
        <input name="email" type="email" required defaultValue={dv.email ?? ""} className={field} />
      </div>
      <div>
        <label className={label}>Weboldal</label>
        <input name="website" type="text" defaultValue={dv.website ?? ""} className={field} />
      </div>
      <div className="col-span-2">
        <label className={label}>Kép URL</label>
        <input name="image" type="text" defaultValue={dv.image ?? ""} className={field} />
      </div>
    </div>
  );
}
