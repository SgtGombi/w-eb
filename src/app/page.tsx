// src/app/shelters/page.tsx
import { prisma } from '@/lib/prisma';

export default async function SheltersPage() {
  const shelters = await prisma.shelter.findMany();

  return (
    <div>
      <h1>Menhelyek</h1>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter.id}>{shelter.name}</li>
        ))}
      </ul>
    </div>
  );
}