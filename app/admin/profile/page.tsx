"use client";

import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        setForm({
          name: data.name || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          address: data.address || "",
          instagram: data.instagram || "",
          facebook: data.facebook || "",
          whatsapp: data.whatsapp || "",
        });

        setLoading(false);
      });
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Profile Updated Successfully ✅");
    setForm((prev) => ({ ...prev, password: "" }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow space-y-4">

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="instagram"
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="facebook"
          placeholder="Facebook URL"
          value={form.facebook}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp Number (e.g. 919876543210)"
          value={form.whatsapp}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="New Password (optional)"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-black text-white px-4 py-2">
          Update Profile
        </button>
      </form>
    </div>
  );
}