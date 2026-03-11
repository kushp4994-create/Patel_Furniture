"use client";

import { useEffect, useState } from "react";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch("/api/inquiries");

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setInquiries(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Product Inquiries
      </h1>

      {inquiries.length === 0 ? (
        <p>No inquiries found</p>
      ) : (

        <div className="grid gap-4">

          {inquiries.map((item) => (

            <div
              key={item.id}
              className="border p-5 rounded shadow"
            >

              <p>
                <strong>Name:</strong> {item.name}
              </p>

              <p>
                <strong>Email:</strong> {item.email}
              </p>

              <p>
                <strong>Message:</strong> {item.message}
              </p>

              {/* Product Name */}
              {item.product && (
                <p className="text-green-600">
                  <strong>Product:</strong> {item.product.name}
                </p>
              )}

              {/* Date */}
              <p className="text-gray-500 text-sm mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}