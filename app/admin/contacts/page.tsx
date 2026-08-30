"use client";

import { useEffect, useState } from "react";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);

  const fetchContacts = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchContacts();
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      <div className="space-y-6">
        {contacts.map((item) => (
          <div key={item.id} className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold">
              {item.name} ({item.email})
            </h3>

            <p className="text-gray-600 mt-2">
              {item.message}
            </p>

            <button
              onClick={() => handleDelete(item.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}