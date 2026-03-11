"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered Successfully");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button className="bg-black text-white px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
}