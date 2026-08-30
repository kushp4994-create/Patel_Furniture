"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  MessageSquare, 
  UserCircle, 
  PhoneCall, 
  Calendar,
  LogOut,
  Search,
  Bell,
  Settings
} from "lucide-react";
import { useState } from "react";



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/visitors", label: "Visitors", icon: Users },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
    { path: "/admin/profile", label: "Profile", icon: UserCircle },
    { path: "/admin/contacts", label: "Contacts", icon: PhoneCall },
    { path: "/admin/appointments", label: "Appointments", icon: Calendar },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      
      {/* SIDEBAR - Modern Glassmorphism */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#0B1120] to-[#1a2639] text-white p-6 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#5fb3a9]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#3c8f86]/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* Logo Section */}
      <div className="flex items-center mb-10 ">
              <img
                src="/images/logo2.png"
                alt="logo"
                className="w-30 h-20 object-contain"
              />
              <div>
                <h2 className="text-white text-2xl font-medium tracking-wide ">
                  PATEL
                </h2>
                <p className="text-xs tracking-widest text-gray-500 ">
                  FURNITURE COMPANY 
                </p>
              </div>
              </div>


        {/* Navigation */}
        <nav className="relative z-10 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5fb3a9] to-[#3c8f86] rounded-xl"></div>
                )}
                <div className={`absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'hidden' : ''}`}></div>
                <Icon size={20} className={`relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                <span className="relative z-10 font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute right-4 w-1.5 h-8 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="relative z-10 mt-4 group flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-4 py-3.5 w-full rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/50"
        >
          <LogOut size={20} className="transition-transform group-hover:rotate-180" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col ml-72">
        
        {/* TOP HEADER - Modern & Clean */}
        <header className="bg-white/80 backdrop-blur-xl h-20 flex items-center justify-between px-8 shadow-sm border-b border-gray-200/50 sticky top-0 z-20">
          
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Welcome back, Admin
            </h1>
            <span className="px-3 py-1 bg-[#5fb3a9]/10 text-[#5fb3a9] rounded-full text-xs font-medium">
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-6">
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-80 pl-11 pr-4 py-2.5 bg-gray-100/50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5fb3a9] placeholder-gray-400 transition-all"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search size={18} className="absolute left-4 top-3 text-gray-400" />
            </div>

            {/* Notification Icon */}
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Link href="/admin/notifications">
  <Bell size={20} className="text-gray-600" />
</Link>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#5fb3a9] to-[#3c8f86] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                A
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}