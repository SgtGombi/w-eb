"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError("Hibás email vagy jelszó.");
      setLoading(false);
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <main>
      <h1>Admin bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="password" type="password" placeholder="Jelszó" required />
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Bejelentkezés"}
        </button>
      </form>
    </main>
  );
}
