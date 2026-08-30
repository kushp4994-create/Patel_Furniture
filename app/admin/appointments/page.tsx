"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminAppointments() {

  const [appointments, setAppointments] = useState<any[]>([]);

  const loadAppointments = () => {
    fetch("/api/admin/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {

    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    console.log("UPDATE RESPONSE:", data);

    loadAppointments();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        {/* CALENDAR BUTTON */}
        <Link
          href="/admin/appointments/calendar"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          📅 Calendar View
        </Link>

      </div>


      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map((a) => (

            <tr key={a.id}>

              <td className="border p-2">{a.name}</td>

              <td className="border p-2">{a.phone}</td>

              <td className="border p-2">
                {new Date(a.date).toLocaleDateString()}
              </td>

              <td className="border p-2">{a.status}</td>

              <td className="border p-2 flex gap-2">

                <button
                  onClick={() => updateStatus(a.id, "APPROVED")}
                  className="bg-green-500 text-white px-3 py-1"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(a.id, "REJECTED")}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Reject
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}