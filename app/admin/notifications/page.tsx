"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {

    const loadNotifications = async () => {
      const res = await fetch("/api/notifications", {
        cache: "no-store",
      });

      const data = await res.json();
      setNotifications(data);
    };

    loadNotifications();

  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white p-5 rounded-xl shadow flex items-start gap-4"
          >
            <Bell className="text-[#5fb3a9]" />

            <div>
              <h3 className="font-semibold">
                {n.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {n.message}
              </p>

              <span className="text-xs text-gray-400">
                {new Date(n.time).toLocaleString()}
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}