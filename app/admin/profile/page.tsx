"use client";

import { useEffect, useState } from "react";

interface ProfileForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
}

export default function AdminProfile() {
  const [form, setForm] = useState<ProfileForm>({
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setLoading(false);
          return;
        }

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
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Profile Updated Successfully ✅");

      setForm((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      alert(
        "Something went wrong while updating the profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     LOADING SKELETON
  ====================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-9 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
          </div>

          {/* Card Skeleton */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="h-24 animate-pulse bg-gray-100" />

            <div className="space-y-8 p-5 sm:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="space-y-2"
                    >
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-12 w-full animate-pulse rounded-xl bg-gray-100" />
                    </div>
                  )
                )}
              </div>

              <div className="space-y-5">
                {Array.from({ length: 3 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="space-y-2"
                    >
                      <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                      <div className="h-12 w-full animate-pulse rounded-xl bg-gray-100" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* =================================================
            PAGE HEADER
        ================================================== */}

        <header className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#5fb3a9]/10 px-3 py-1.5 text-xs font-semibold text-[#4b9d94]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fb3a9]" />
            Account Settings
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Admin Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Manage your account and contact
            information from one place.
          </p>
        </header>

        {/* =================================================
            MAIN PROFILE CARD
        ================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* TOP BANNER */}

          <div className="relative overflow-hidden bg-gradient-to-r from-[#5fb3a9] to-[#75c4ba] px-5 py-6 sm:px-8">
            {/* Decorative circles */}

            <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-white/10" />

            <div className="relative flex items-center gap-4">
              {/* Avatar */}

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-2xl font-bold text-white shadow-lg backdrop-blur-sm">
                {form.name
                  ? form.name
                    .charAt(0)
                    .toUpperCase()
                  : "A"}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                  Administrator
                </p>

                <h2 className="mt-1 truncate text-xl font-bold text-white">
                  {form.name ||
                    "Admin Account"}
                </h2>

                <p className="mt-1 truncate text-sm text-white/80">
                  {form.email ||
                    "Manage your profile"}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-8"
          >
            {/* =================================================
                PERSONAL INFORMATION
            ================================================== */}

            <section>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5fb3a9]/10 text-lg">
                  👤
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your basic account and
                    contact details.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      ✉
                    </span>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={form.email}
                      onChange={
                        handleChange
                      }
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      ☎
                    </span>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={
                        handleChange
                      }
                      autoComplete="tel"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                    />
                  </div>
                </div>

                {/* ADDRESS */}

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={4}
                    placeholder="Enter your address"
                    value={form.address}
                    onChange={
                      handleChange
                    }
                    autoComplete="street-address"
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                  />
                </div>
              </div>
            </section>

            {/* DIVIDER */}

            <div className="my-9 border-t border-gray-100" />

            {/* =================================================
                SOCIAL & CONTACT
            ================================================== */}

            <section>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e0b15c]/15 text-lg">
                  🔗
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Social & Contact
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage your social media and
                    WhatsApp contact information.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* INSTAGRAM */}

                <div>
                  <label
                    htmlFor="instagram"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Instagram URL
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
                      @
                    </span>

                    <input
                      id="instagram"
                      name="instagram"
                      type="url"
                      placeholder="https://instagram.com/yourpage"
                      value={
                        form.instagram
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                    />
                  </div>
                </div>

                {/* FACEBOOK */}

                <div>
                  <label
                    htmlFor="facebook"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Facebook URL
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                      f
                    </span>

                    <input
                      id="facebook"
                      name="facebook"
                      type="url"
                      placeholder="https://facebook.com/yourpage"
                      value={
                        form.facebook
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                    />
                  </div>
                </div>

                {/* WHATSAPP */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="whatsapp"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    WhatsApp Number
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      ☎
                    </span>

                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      placeholder="919876543210"
                      value={
                        form.whatsapp
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Example: 919876543210
                  </p>
                </div>
              </div>
            </section>

            {/* DIVIDER */}

            <div className="my-9 border-t border-gray-100" />

            {/* =================================================
                SECURITY
            ================================================== */}

            <section>
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                  🔒
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Security
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Change your admin password if
                    you need to update your login
                    credentials.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  New Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter new password (optional)"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Leave this field empty if you
                  don't want to change your
                  password.
                </p>
              </div>
            </section>

            {/* =================================================
                ACTION BAR
            ================================================== */}

            <div className="mt-9 flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Save your changes
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Your profile information will
                  be updated immediately.
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-[#5fb3a9] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4fa69c] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#5fb3a9]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                      aria-hidden="true"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <span>
                      ✓
                    </span>

                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* FOOTER INFO */}

        <p className="mt-5 text-center text-xs text-gray-400">
          Keep your profile and contact
          information up to date.
        </p>
      </div>
    </main>
  );
}