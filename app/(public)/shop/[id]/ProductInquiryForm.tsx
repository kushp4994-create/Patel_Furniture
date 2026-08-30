"use client";

import { useState } from "react";

export default function ProductInquiryForm({
  productId,
}: {
  productId: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        productId,
      }),
    });

    if (res.ok) {
      alert("Inquiry Sent Successfully");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">

      <h3 className="text-xl font-semibold mb-4">
        Product Inquiry
      </h3>

      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full border p-3"
      />

      <input
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full border p-3"
      />

      <textarea
        placeholder="Your Message"
        rows={4}
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
        className="w-full border p-3"
      />

      <button className="bg-black text-white px-6 py-3">
        Send Inquiry
      </button>

    </form>
  );
}