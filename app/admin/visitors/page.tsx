"use client";

import { useEffect, useState } from "react";

export default function AdminVisitors() {

  const [visitors, setVisitors] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/visitors")
      .then((res) => res.json())
      .then((data) => setVisitors(data));
  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Visitors
      </h1>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">IP</th>
            <th className="p-2 border">Browser</th>
            <th className="p-2 border">Visit Time</th>
          </tr>
        </thead>

        <tbody>

          {visitors.map((v) => (

            <tr key={v.id}>

              <td className="border p-2">
                {v.ip}
              </td>

              <td className="border p-2">
                {v.userAgent}
              </td>

              <td className="border p-2">
                {new Date(v.createdAt).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}