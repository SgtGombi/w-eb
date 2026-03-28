import { auth } from "@auth";

export default async function AdminDashboardPage() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600">
        Üdvözöljük, <strong>{session?.user?.name}</strong>!
      </p>
    </div>
  );
}

