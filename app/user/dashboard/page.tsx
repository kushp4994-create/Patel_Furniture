"use client";

import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <p className="mb-4">Welcome to your dashboard.</p>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}