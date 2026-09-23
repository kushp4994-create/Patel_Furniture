"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type InquiryStatus = "New" | "Read" | "Replied" | "Closed";

interface Product {
  id?: string | number;
  name?: string | null;
  image?: string | null;
  price?: string | number | null;
}

interface Inquiry {
  id: string | number;
  name: string;
  email: string;
  message: string;
  product?: Product | null;
  createdAt: string;
  status?: InquiryStatus | null;
}

type StatusFilter = "All" | InquiryStatus;
type DateFilter = "All" | "Today" | "7days" | "30days";

interface ApiErrorResponse {
  message?: string;
}

const STATUS_OPTIONS: InquiryStatus[] = [
  "New",
  "Read",
  "Replied",
  "Closed",
];

function isInquiryStatus(value: unknown): value is InquiryStatus {
  return STATUS_OPTIONS.includes(value as InquiryStatus);
}

function normalizeInquiry(item: unknown): Inquiry | null {
  if (!item || typeof item !== "object") {
    return null;
  }

  const data = item as Record<string, unknown>;

  if (
    (typeof data.id !== "string" && typeof data.id !== "number") ||
    typeof data.name !== "string" ||
    typeof data.email !== "string" ||
    typeof data.message !== "string" ||
    typeof data.createdAt !== "string"
  ) {
    return null;
  }

  let product: Product | null = null;

  if (data.product && typeof data.product === "object") {
    const rawProduct = data.product as Record<string, unknown>;

    product = {
      id:
        typeof rawProduct.id === "string" ||
          typeof rawProduct.id === "number"
          ? rawProduct.id
          : undefined,
      name:
        typeof rawProduct.name === "string"
          ? rawProduct.name
          : null,
      image:
        typeof rawProduct.image === "string"
          ? rawProduct.image
          : null,
      price:
        typeof rawProduct.price === "string" ||
          typeof rawProduct.price === "number"
          ? rawProduct.price
          : null,
    };
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    message: data.message,
    product,
    createdAt: data.createdAt,
    status: isInquiryStatus(data.status) ? data.status : "New",
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isWithinDays(dateString: string, days: number) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const now = new Date();
  const difference = now.getTime() - date.getTime();

  return difference >= 0 && difference <= days * 24 * 60 * 60 * 1000;
}

function getStatusClasses(status: InquiryStatus) {
  switch (status) {
    case "New":
      return "bg-blue-50 text-blue-700 ring-blue-200";

    case "Read":
      return "bg-amber-50 text-amber-700 ring-amber-200";

    case "Replied":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";

    case "Closed":
      return "bg-gray-100 text-gray-700 ring-gray-200";

    default:
      return "bg-gray-100 text-gray-700 ring-gray-200";
  }
}

function getStatusDot(status: InquiryStatus) {
  switch (status) {
    case "New":
      return "bg-blue-500";

    case "Read":
      return "bg-amber-500";

    case "Replied":
      return "bg-emerald-500";

    case "Closed":
      return "bg-gray-500";

    default:
      return "bg-gray-500";
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0]?.charAt(0).toUpperCase() || "U";
  }

  return `${parts[0]?.charAt(0) || ""}${parts[1]?.charAt(0) || ""}`.toUpperCase();
}

function truncateMessage(message: string, length = 90) {
  if (message.length <= length) {
    return message;
  }

  return `${message.slice(0, length).trim()}...`;
}

function SkeletonRow() {
  return (
    <div className="animate-pulse border-b border-gray-100 px-5 py-5 last:border-0">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-gray-200" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="h-3 w-52 rounded bg-gray-100" />
        </div>

        <div className="hidden h-8 w-24 rounded-full bg-gray-200 sm:block" />
        <div className="hidden h-8 w-20 rounded bg-gray-200 md:block" />
      </div>
    </div>
  );
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [dateFilter, setDateFilter] = useState<DateFilter>("All");

  const [selectedInquiry, setSelectedInquiry] =
    useState<Inquiry | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Inquiry | null>(null);

  const [updatingId, setUpdatingId] = useState<string | number | null>(
    null
  );

  const [deletingId, setDeletingId] = useState<string | number | null>(
    null
  );

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({
        type,
        message,
      });

      window.setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    []
  );

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/inquiries", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch inquiries.");
      }

      const data: unknown = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid inquiry response.");
      }

      const normalized = data
        .map(normalizeInquiry)
        .filter((item): item is Inquiry => item !== null);

      setInquiries(normalized);
    } catch (err) {
      console.error("Fetch inquiries error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load inquiries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const filteredInquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return inquiries.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        (item.product?.name || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        (item.status || "New") === statusFilter;

      let matchesDate = true;

      if (dateFilter === "Today") {
        matchesDate = isToday(item.createdAt);
      }

      if (dateFilter === "7days") {
        matchesDate = isWithinDays(item.createdAt, 7);
      }

      if (dateFilter === "30days") {
        matchesDate = isWithinDays(item.createdAt, 30);
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [inquiries, search, statusFilter, dateFilter]);

  const summary = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter((item) => item.status === "New").length,
      replied: inquiries.filter((item) => item.status === "Replied").length,
      closed: inquiries.filter((item) => item.status === "Closed").length,
    };
  }, [inquiries]);

  const updateStatus = async (
    inquiry: Inquiry,
    status: InquiryStatus
  ) => {
    try {
      setUpdatingId(inquiry.id);

      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      let data: unknown = null;

      try {
        data = await res.json();
      } catch {
        // Response may not contain JSON.
      }

      if (!res.ok) {
        const apiError = data as ApiErrorResponse | null;

        throw new Error(
          apiError?.message || "Failed to update inquiry status."
        );
      }

      setInquiries((previous) =>
        previous.map((item) =>
          item.id === inquiry.id
            ? {
              ...item,
              status,
            }
            : item
        )
      );

      setSelectedInquiry((previous) =>
        previous?.id === inquiry.id
          ? {
            ...previous,
            status,
          }
          : previous
      );

      showToast("success", `Inquiry marked as ${status}.`);
    } catch (err) {
      console.error("Status update error:", err);

      showToast(
        "error",
        err instanceof Error
          ? err.message
          : "Unable to update inquiry."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeletingId(deleteTarget.id);

      const res = await fetch(
        `/api/inquiries/${deleteTarget.id}`,
        {
          method: "DELETE",
        }
      );

      let data: unknown = null;

      try {
        data = await res.json();
      } catch {
        // Response may not contain JSON.
      }

      if (!res.ok) {
        const apiError = data as ApiErrorResponse | null;

        throw new Error(
          apiError?.message || "Failed to delete inquiry."
        );
      }

      setInquiries((previous) =>
        previous.filter((item) => item.id !== deleteTarget.id)
      );

      if (selectedInquiry?.id === deleteTarget.id) {
        setSelectedInquiry(null);
      }

      setDeleteTarget(null);

      showToast("success", "Inquiry deleted successfully.");
    } catch (err) {
      console.error("Delete inquiry error:", err);

      showToast(
        "error",
        err instanceof Error
          ? err.message
          : "Unable to delete inquiry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);

    if ((inquiry.status || "New") === "New") {
      await updateStatus(inquiry, "Read");
    }
  };

  const handleMarkRead = async (inquiry: Inquiry) => {
    await updateStatus(inquiry, "Read");
  };

  const handleReply = (inquiry: Inquiry) => {
    window.location.href = `mailto:${encodeURIComponent(
      inquiry.email
    )}?subject=${encodeURIComponent(
      `Regarding your product inquiry`
    )}`;
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setDateFilter("All");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Toast */}
        {toast && (
          <div
            role="status"
            className={`fixed right-4 top-4 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl ${toast.type === "success"
              ? "border-emerald-200 bg-white text-emerald-700"
              : "border-red-200 bg-white text-red-700"
              }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${toast.type === "success"
                ? "bg-emerald-50"
                : "bg-red-50"
                }`}
            >
              {toast.type === "success" ? "✓" : "!"}
            </span>

            <span className="text-sm font-medium">
              {toast.message}
            </span>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-2 text-gray-400 transition hover:text-gray-700"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <header className="mb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#5fb3a9]/10 px-3 py-1.5 text-xs font-semibold text-[#4b9d94]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fb3a9]" />
            Customer Messages
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Product Inquiries
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Manage customer questions, product requests and
                communication from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchInquiries}
              disabled={loading}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className={loading ? "animate-spin" : ""}>
                ↻
              </span>
              Refresh
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Inquiries"
            value={summary.total}
            icon="✉"
            description="All customer inquiries"
            iconClass="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="New Inquiries"
            value={summary.new}
            icon="●"
            description="Waiting for review"
            iconClass="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            title="Replied"
            value={summary.replied}
            icon="✓"
            description="Customer contacted"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Closed"
            value={summary.closed}
            icon="✓"
            description="Completed inquiries"
            iconClass="bg-gray-100 text-gray-600"
          />
        </section>

        {/* Main Panel */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Filters */}
          <div className="border-b border-gray-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ⌕
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email or product..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#5fb3a9] focus:bg-white focus:ring-4 focus:ring-[#5fb3a9]/10"
                  aria-label="Search inquiries"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex">

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as StatusFilter
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                  aria-label="Filter by status"
                >
                  <option value="All">All Statuses</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {/* Date Filter */}
                <select
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(
                      e.target.value as DateFilter
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                  aria-label="Filter by date"
                >
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>

                {(search ||
                  statusFilter !== "All" ||
                  dateFilter !== "All") && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      Clear
                    </button>
                  )}
              </div>
            </div>

            {!loading && (
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>
                  Showing{" "}
                  <strong className="text-gray-700">
                    {filteredInquiries.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-gray-700">
                    {inquiries.length}
                  </strong>{" "}
                  inquiries
                </span>
              </div>
            )}
          </div>

          {/* Error */}
          {error && !loading && (
            <div className="p-6">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  !
                </div>

                <h3 className="mt-4 font-bold text-red-900">
                  Unable to load inquiries
                </h3>

                <p className="mt-2 text-sm text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchInquiries}
                  className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            filteredInquiries.length === 0 && (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5fb3a9]/10 text-2xl text-[#4b9d94]">
                  ✉
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {inquiries.length === 0
                    ? "No inquiries yet"
                    : "No matching inquiries"}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  {inquiries.length === 0
                    ? "Customer product inquiries will appear here when someone contacts you."
                    : "Try changing your search or filters to find the inquiry you're looking for."}
                </p>

                {inquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-[#5fb3a9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4fa69c]"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

          {/* Desktop Table */}
          {!loading &&
            !error &&
            filteredInquiries.length > 0 && (
              <>
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full min-w-[1000px]">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Product
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Message
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Date
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredInquiries.map((item) => {
                        const status = item.status || "New";

                        return (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/70"
                          >
                            <td className="px-5 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5fb3a9]/10 text-sm font-bold text-[#4b9d94]">
                                  {getInitials(item.name)}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-gray-900">
                                    {item.name}
                                  </p>

                                  <p className="mt-1 max-w-[190px] truncate text-xs text-gray-500">
                                    {item.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-5">
                              {item.product?.name ? (
                                <span className="inline-flex max-w-[170px] truncate rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
                                  {item.product.name}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">
                                  General Inquiry
                                </span>
                              )}
                            </td>

                            <td className="max-w-[280px] px-5 py-5">
                              <p className="text-sm leading-6 text-gray-600">
                                {truncateMessage(item.message)}
                              </p>
                            </td>

                            <td className="whitespace-nowrap px-5 py-5">
                              <p className="text-sm font-medium text-gray-700">
                                {formatDate(item.createdAt)}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {formatTime(item.createdAt)}
                              </p>
                            </td>

                            <td className="px-5 py-5">
                              <StatusBadge status={status} />
                            </td>

                            <td className="px-5 py-5">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleView(item)
                                  }
                                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#5fb3a9] hover:text-[#4b9d94]"
                                >
                                  View
                                </button>

                                {status === "New" && (
                                  <button
                                    type="button"
                                    disabled={
                                      updatingId === item.id
                                    }
                                    onClick={() =>
                                      handleMarkRead(item)
                                    }
                                    className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                                  >
                                    Read
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReply(item)
                                  }
                                  className="rounded-lg bg-[#5fb3a9]/10 px-3 py-2 text-xs font-semibold text-[#4b9d94] transition hover:bg-[#5fb3a9]/20"
                                >
                                  Reply
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteTarget(item)
                                  }
                                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile / Tablet Cards */}
                <div className="grid gap-4 p-4 lg:hidden sm:p-5">
                  {filteredInquiries.map((item) => {
                    const status = item.status || "New";

                    return (
                      <article
                        key={item.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md sm:p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5fb3a9]/10 text-sm font-bold text-[#4b9d94]">
                              {getInitials(item.name)}
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate font-bold text-gray-900">
                                {item.name}
                              </h3>

                              <p className="truncate text-xs text-gray-500">
                                {item.email}
                              </p>
                            </div>
                          </div>

                          <StatusBadge status={status} />
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                              Product
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-700">
                              {item.product?.name ||
                                "General Inquiry"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                              Received
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-700">
                              {formatDate(item.createdAt)}
                            </p>

                            <p className="text-xs text-gray-400">
                              {formatTime(item.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl bg-gray-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Message
                          </p>

                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {truncateMessage(item.message, 180)}
                          </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleView(item)
                            }
                            className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                          >
                            View
                          </button>

                          {status === "New" ? (
                            <button
                              type="button"
                              disabled={
                                updatingId === item.id
                              }
                              onClick={() =>
                                handleMarkRead(item)
                              }
                              className="rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                            >
                              Read
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  item,
                                  "Replied"
                                )
                              }
                              disabled={
                                updatingId === item.id ||
                                status === "Replied"
                              }
                              className="rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                            >
                              Replied
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleReply(item)
                            }
                            className="rounded-xl bg-[#5fb3a9]/10 px-3 py-2.5 text-xs font-semibold text-[#4b9d94] transition hover:bg-[#5fb3a9]/20"
                          >
                            Email
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(item)
                            }
                            className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
        </section>
      </div>

      {/* Details Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-details-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedInquiry(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4b9d94]">
                  Inquiry Details
                </p>

                <h2
                  id="inquiry-details-title"
                  className="mt-1 text-xl font-bold text-gray-900"
                >
                  {selectedInquiry.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Complete customer inquiry information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Customer Name"
                  value={selectedInquiry.name}
                />

                <DetailItem
                  label="Email"
                  value={selectedInquiry.email}
                />

                <DetailItem
                  label="Product"
                  value={
                    selectedInquiry.product?.name ||
                    "General Inquiry"
                  }
                />

                <DetailItem
                  label="Status"
                  value={
                    selectedInquiry.status || "New"
                  }
                />

                <DetailItem
                  label="Date"
                  value={formatDate(
                    selectedInquiry.createdAt
                  )}
                />

                <DetailItem
                  label="Time"
                  value={formatTime(
                    selectedInquiry.createdAt
                  )}
                />
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Complete Message
                </p>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    handleReply(selectedInquiry)
                  }
                  className="flex-1 rounded-xl bg-[#5fb3a9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4fa69c]"
                >
                  Reply via Email
                </button>

                <select
                  value={
                    selectedInquiry.status || "New"
                  }
                  onChange={(e) =>
                    updateStatus(
                      selectedInquiry,
                      e.target.value as InquiryStatus
                    )
                  }
                  disabled={
                    updatingId === selectedInquiry.id
                  }
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#5fb3a9] focus:ring-4 focus:ring-[#5fb3a9]/10"
                  aria-label="Change inquiry status"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-600">
              !
            </div>

            <h2
              id="delete-title"
              className="mt-5 text-xl font-bold text-gray-900"
            >
              Delete this inquiry?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              This will permanently remove the inquiry from
              the admin panel. This action cannot be undone.
            </p>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">
                {deleteTarget.name}
              </p>

              <p className="mt-1 truncate text-sm text-gray-500">
                {deleteTarget.email}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId !== null}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteInquiry}
                disabled={deletingId !== null}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId !== null ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  "Delete Inquiry"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------------------------------------
   Summary Card
--------------------------------------------- */

interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  description: string;
  iconClass: string;
}

function SummaryCard({
  title,
  value,
  icon,
  description,
  iconClass,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

/* ---------------------------------------------
   Status Badge
--------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: InquiryStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusClasses(
        status
      )}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
          status
        )}`}
      />

      {status}
    </span>
  );
}

/* ---------------------------------------------
   Detail Item
--------------------------------------------- */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}