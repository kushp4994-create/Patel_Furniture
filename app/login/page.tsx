"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.role === "ADMIN") {
        router.push("/admin");   // ✅ FIXED
      } else {
        router.push("/user");    // ✅ FIXED
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}