
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type AppointmentStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

type StatusFilter =
  | "ALL"
  | AppointmentStatus;

type SortOrder = "ASC" | "DESC";

interface Appointment {
  id: string;
  name?: string | null;
  phone?: string | null;
  date?: string | Date | null;
  status?: string | null;

  // Optional fields
  time?: string | null;
  appointmentTime?: string | null;
  email?: string | null;
  service?: string | null;
  notes?: string | null;

  // Allows other API fields safely
  [key: string]: unknown;
}

/* =========================================================
   HELPERS
========================================================= */

const STATUS_VALUES: AppointmentStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
];

function normalizeStatus(
  status: unknown
): AppointmentStatus {
  const normalized = String(
    status ?? "PENDING"
  ).toUpperCase();

  if (
    STATUS_VALUES.includes(
      normalized as AppointmentStatus
    )
  ) {
    return normalized as AppointmentStatus;
  }

  return "PENDING";
}

function parseDate(value: unknown): Date | null {
  if (!value) return null;

  const date =
    value instanceof Date
      ? value
      : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function formatDate(value: unknown): string {
  const date = parseDate(value);

  if (!date) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value: unknown): string {
  const date = parseDate(value);

  if (!date) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAppointmentTime(
  appointment: Appointment
): string {
  if (
    typeof appointment.time === "string" &&
    appointment.time.trim()
  ) {
    return appointment.time;
  }

  if (
    typeof appointment.appointmentTime ===
    "string" &&
    appointment.appointmentTime.trim()
  ) {
    return appointment.appointmentTime;
  }

  return "—";
}

function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) =>
      char.toUpperCase()
    );
}

function formatFieldValue(
  key: string,
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (
    key.toLowerCase().includes("date")
  ) {
    const date = parseDate(value);

    if (date) {
      return formatDateTime(value);
    }
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  return String(value);
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: unknown;
}) {
  const normalizedStatus =
    normalizeStatus(status);

  const styles: Record<
    AppointmentStatus,
    string
  > = {
    PENDING:
      "bg-yellow-50 text-yellow-700 border-yellow-200",
    APPROVED:
      "bg-green-50 text-green-700 border-green-200",
    REJECTED:
      "bg-red-50 text-red-700 border-red-200",
  };

  const dots: Record<
    AppointmentStatus,
    string
  > = {
    PENDING: "bg-yellow-500",
    APPROVED: "bg-green-500",
    REJECTED: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[normalizedStatus]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[normalizedStatus]}`}
      />

      {normalizedStatus}
    </span>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function AppointmentSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map(
        (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-6 rounded-full bg-gray-200" />
              <div className="h-8 rounded bg-gray-200" />
            </div>
          </div>
        )
      )}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminAppointments() {
  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");

  const [dateFilter, setDateFilter] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("DESC");

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [viewingAppointment, setViewingAppointment] =
    useState<Appointment | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = useCallback(
    (
      type: "success" | "error",
      message: string
    ) => {
      setToast({
        type,
        message,
      });

      window.setTimeout(() => {
        setToast(null);
      }, 3500);
    },
    []
  );

  /* =========================================================
     LOAD APPOINTMENTS
  ========================================================= */

  const loadAppointments = useCallback(
    async (showRefreshState = false) => {
      try {
        if (showRefreshState) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          "/api/admin/appointments",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load appointments (${response.status})`
          );
        }

        const data: unknown =
          await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid appointment data received from the server."
          );
        }

        setAppointments(
          data as Appointment[]
        );
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load appointments.";

        setError(message);

        showToast(
          "error",
          message
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    return appointments.reduce(
      (stats, appointment) => {
        const status =
          normalizeStatus(
            appointment.status
          );

        stats.total++;

        if (status === "PENDING") {
          stats.pending++;
        }

        if (status === "APPROVED") {
          stats.approved++;
        }

        if (status === "REJECTED") {
          stats.rejected++;
        }

        return stats;
      },
      {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      }
    );
  }, [appointments]);

  /* =========================================================
     SEARCH + FILTER + SORT
  ========================================================= */

  const filteredAppointments =
    useMemo(() => {
      const searchValue =
        search.trim().toLowerCase();

      const result =
        appointments.filter(
          (appointment) => {
            const name = String(
              appointment.name ?? ""
            ).toLowerCase();

            const phone = String(
              appointment.phone ?? ""
            ).toLowerCase();

            const status =
              normalizeStatus(
                appointment.status
              );

            const matchesSearch =
              !searchValue ||
              name.includes(
                searchValue
              ) ||
              phone.includes(
                searchValue
              );

            const matchesStatus =
              statusFilter === "ALL" ||
              status === statusFilter;

            let matchesDate = true;

            if (dateFilter) {
              const appointmentDate =
                parseDate(
                  appointment.date
                );

              if (!appointmentDate) {
                matchesDate = false;
              } else {
                const year =
                  appointmentDate.getFullYear();

                const month = String(
                  appointmentDate.getMonth() +
                  1
                ).padStart(2, "0");

                const day = String(
                  appointmentDate.getDate()
                ).padStart(2, "0");

                const appointmentDateString =
                  `${year}-${month}-${day}`;

                matchesDate =
                  appointmentDateString ===
                  dateFilter;
              }
            }

            return (
              matchesSearch &&
              matchesStatus &&
              matchesDate
            );
          }
        );

      result.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        const difference =
          dateA.getTime() -
          dateB.getTime();

        return sortOrder === "ASC"
          ? difference
          : -difference;
      });

      return result;
    }, [
      appointments,
      search,
      statusFilter,
      dateFilter,
      sortOrder,
    ]);

  /* =========================================================
     UPDATE STATUS
     
     PENDING  -> APPROVED
     PENDING  -> REJECTED
     REJECTED -> APPROVED
  ========================================================= */

  const updateStatus = async (
    id: string,
    status:
      | "APPROVED"
      | "REJECTED"
  ) => {
    if (updatingId) {
      return;
    }

    /* -----------------------------------------
       Confirmation before REJECT
    ------------------------------------------ */

    if (status === "REJECTED") {
      const confirmed =
        window.confirm(
          "Are you sure you want to reject this appointment?"
        );

      if (!confirmed) {
        return;
      }
    }

    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch(
        `/api/admin/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data: unknown =
        await response.json();

      console.log(
        "UPDATE RESPONSE:",
        data
      );

      if (!response.ok) {
        let message =
          "Failed to update appointment.";

        if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message ===
          "string"
        ) {
          message = data.message;
        }

        if (
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error ===
          "string"
        ) {
          message = data.error;
        }

        throw new Error(message);
      }

      /* -----------------------------------------
         Update appointment locally
         No browser reload
         No extra GET request
      ------------------------------------------ */

      setAppointments(
        (currentAppointments) =>
          currentAppointments.map(
            (appointment) =>
              appointment.id === id
                ? {
                  ...appointment,
                  status,
                }
                : appointment
          )
      );

      showToast(
        "success",
        status === "REJECTED"
          ? "Appointment rejected successfully."
          : "Appointment approved successfully."
      );
    } catch (err) {
      console.error(
        "UPDATE APPOINTMENT ERROR:",
        err
      );

      const message =
        err instanceof Error
          ? err.message
          : "Failed to update appointment.";

      setError(message);

      showToast(
        "error",
        message
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="mb-1 text-sm font-medium text-blue-600">
              Admin Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Appointments
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage customer appointments and
              their status.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            {/* REFRESH */}
            <button
              type="button"
              onClick={() =>
                loadAppointments(true)
              }
              disabled={
                loading || refreshing
              }
              title="Refresh appointments"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              >
                ↻
              </span>

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

            {/* CALENDAR */}
            <Link
              href="/admin/appointments/calendar"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              📅 Calendar View
            </Link>
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <div>
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-0.5">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              aria-label="Dismiss error"
              className="text-lg leading-none text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section
          aria-label="Appointment statistics"
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >

          {/* TOTAL */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Appointments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {statistics.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📋
              </div>
            </div>
          </div>

          {/* PENDING */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {statistics.pending}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-xl">
                ⏳
              </div>
            </div>
          </div>

          {/* APPROVED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Approved
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {statistics.approved}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                ✓
              </div>
            </div>
          </div>

          {/* REJECTED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Rejected
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {statistics.rejected}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
                ×
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* FILTERS */}
          <div className="border-b border-gray-200 p-4 sm:p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

              {/* SEARCH */}
              <div className="w-full lg:max-w-md">
                <label
                  htmlFor="appointment-search"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Search appointments
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>

                  <input
                    id="appointment-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search by name or phone..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* FILTERS */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                {/* STATUS */}
                <div>
                  <label
                    htmlFor="status-filter"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>

                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target
                          .value as StatusFilter
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="ALL">
                      All
                    </option>

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="APPROVED">
                      Approved
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label
                    htmlFor="date-filter"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>

                  <input
                    id="date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(event) =>
                      setDateFilter(
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* SORT */}
                <div>
                  <label
                    htmlFor="sort-filter"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Sort Date
                  </label>

                  <select
                    id="sort-filter"
                    value={sortOrder}
                    onChange={(event) =>
                      setSortOrder(
                        event.target
                          .value as SortOrder
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="DESC">
                      Newest First
                    </option>

                    <option value="ASC">
                      Oldest First
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* FILTER INFO */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">

              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {
                    filteredAppointments.length
                  }
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {appointments.length}
                </span>{" "}
                appointments
              </p>

              {(search ||
                statusFilter !==
                "ALL" ||
                dateFilter) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter(
                        "ALL"
                      );
                      setDateFilter("");
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Clear filters
                  </button>
                )}
            </div>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <div className="p-4 sm:p-5">
              <AppointmentSkeleton />
            </div>
          ) : filteredAppointments.length ===
            0 ? (

            /* EMPTY */
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                📅
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                No appointments found
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                {appointments.length ===
                  0
                  ? "There are no appointments available yet."
                  : "No appointments match your current search or filters."}
              </p>

              {(search ||
                statusFilter !==
                "ALL" ||
                dateFilter) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter(
                        "ALL"
                      );
                      setDateFilter("");
                    }}
                    className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                )}
            </div>
          ) : (
            <>
              {/* =================================================
                  DESKTOP TABLE
              ================================================== */}

              <div className="hidden overflow-x-auto md:block">

                <table className="w-full min-w-[950px] text-left">

                  <caption className="sr-only">
                    Appointment management table
                  </caption>

                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Customer
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Phone
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Time
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {filteredAppointments.map(
                      (appointment) => {

                        const status =
                          normalizeStatus(
                            appointment.status
                          );

                        const isUpdating =
                          updatingId ===
                          appointment.id;

                        return (
                          <tr
                            key={
                              appointment.id
                            }
                            className="transition hover:bg-gray-50"
                          >

                            {/* CUSTOMER */}
                            <td className="px-5 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                                  {String(
                                    appointment.name ??
                                    "?"
                                  )
                                    .trim()
                                    .charAt(0)
                                    .toUpperCase() ||
                                    "?"}
                                </div>

                                <div className="min-w-0">

                                  <p className="truncate font-semibold text-gray-900">
                                    {appointment.name ||
                                      "Unknown Customer"}
                                  </p>

                                  {typeof appointment.email ===
                                    "string" &&
                                    appointment.email && (
                                      <p className="max-w-[220px] truncate text-xs text-gray-500">
                                        {
                                          appointment.email
                                        }
                                      </p>
                                    )}
                                </div>
                              </div>
                            </td>

                            {/* PHONE */}
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {appointment.phone ||
                                "—"}
                            </td>

                            {/* DATE */}
                            <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-700">
                              {formatDate(
                                appointment.date
                              )}
                            </td>

                            {/* TIME */}
                            <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                              {getAppointmentTime(
                                appointment
                              )}
                            </td>

                            {/* STATUS */}
                            <td className="px-5 py-4">
                              <StatusBadge
                                status={
                                  status
                                }
                              />
                            </td>



                            {/* ACTIONS */}
                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-2">

                                {/* VIEW */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setViewingAppointment(appointment)
                                  }
                                  title="View appointment details"
                                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                  View
                                </button>

                                {/* APPROVE
        PENDING + REJECTED
    */}
                                {(status === "PENDING" ||
                                  status === "REJECTED") && (
                                    <button
                                      type="button"
                                      disabled={!!updatingId}
                                      onClick={() =>
                                        updateStatus(
                                          appointment.id,
                                          "APPROVED"
                                        )
                                      }
                                      title="Approve appointment"
                                      className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                      {isUpdating
                                        ? "Updating..."
                                        : "Approve"}
                                    </button>
                                  )}

                                {/* REJECT
        PENDING + APPROVED
    */}
                                {(status === "PENDING" ||
                                  status === "APPROVED") && (
                                    <button
                                      type="button"
                                      disabled={!!updatingId}
                                      onClick={() =>
                                        updateStatus(
                                          appointment.id,
                                          "REJECTED"
                                        )
                                      }
                                      title="Reject appointment"
                                      className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                      {isUpdating
                                        ? "Updating..."
                                        : "Reject"}
                                    </button>
                                  )}

                              </div>
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>
                </table>
              </div>

              {/* =================================================
                  MOBILE CARDS
              ================================================== */}

              <div className="divide-y divide-gray-100 md:hidden">

                {filteredAppointments.map(
                  (appointment) => {

                    const status =
                      normalizeStatus(
                        appointment.status
                      );

                    const isUpdating =
                      updatingId ===
                      appointment.id;

                    return (
                      <article
                        key={
                          appointment.id
                        }
                        className="p-4"
                      >

                        {/* HEADER */}
                        <div className="flex items-start justify-between gap-3">

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                              {String(
                                appointment.name ??
                                "?"
                              )
                                .trim()
                                .charAt(0)
                                .toUpperCase() ||
                                "?"}
                            </div>

                            <div className="min-w-0">

                              <h3 className="truncate font-semibold text-gray-900">
                                {appointment.name ||
                                  "Unknown Customer"}
                              </h3>

                              <p className="truncate text-sm text-gray-500">
                                {appointment.phone ||
                                  "No phone"}
                              </p>
                            </div>
                          </div>

                          <StatusBadge
                            status={
                              status
                            }
                          />
                        </div>

                        {/* DETAILS */}
                        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3">

                          <div>
                            <p className="text-xs font-medium text-gray-400">
                              Date
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                              {formatDate(
                                appointment.date
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-gray-400">
                              Time
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-700">
                              {getAppointmentTime(
                                appointment
                              )}
                            </p>
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-4 grid grid-cols-2 gap-2">

                          {/* VIEW */}
                          <button
                            type="button"
                            onClick={() =>
                              setViewingAppointment(
                                appointment
                              )
                            }
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            View Details
                          </button>

                          {/* APPROVE
                              PENDING + REJECTED
                          */}
                          {(status ===
                            "PENDING" ||
                            status ===
                            "REJECTED") && (
                              <button
                                type="button"
                                disabled={
                                  !!updatingId
                                }
                                onClick={() =>
                                  updateStatus(
                                    appointment.id,
                                    "APPROVED"
                                  )
                                }
                                className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isUpdating
                                  ? "Updating..."
                                  : "Approve"}
                              </button>
                            )}

                          {/* REJECT
                              ONLY PENDING
                          */}
                          {status ===
                            "PENDING" && (
                              <button
                                type="button"
                                disabled={
                                  !!updatingId
                                }
                                onClick={() =>
                                  updateStatus(
                                    appointment.id,
                                    "REJECTED"
                                  )
                                }
                                className="col-span-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isUpdating
                                  ? "Updating..."
                                  : "Reject Appointment"}
                              </button>
                            )}

                        </div>
                      </article>
                    );
                  }
                )}

              </div>
            </>
          )}
        </section>
      </div>

      {/* =====================================================
          APPOINTMENT DETAILS MODAL
      ====================================================== */}

      {viewingAppointment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-details-title"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setViewingAppointment(
                null
              );
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">

              <div>
                <h2
                  id="appointment-details-title"
                  className="text-lg font-bold text-gray-900"
                >
                  Appointment Details
                </h2>

                <p className="mt-0.5 text-sm text-gray-500">
                  Complete appointment
                  information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingAppointment(
                    null
                  )
                }
                aria-label="Close appointment details"
                title="Close"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            {/* BODY */}
            <div className="max-h-[calc(90vh-150px)] overflow-y-auto p-5 sm:p-6">

              {/* CUSTOMER */}
              <div className="mb-5 rounded-xl bg-gray-50 p-4">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                    {String(
                      viewingAppointment.name ??
                      "?"
                    )
                      .trim()
                      .charAt(0)
                      .toUpperCase() ||
                      "?"}
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="text-lg font-bold text-gray-900">
                      {viewingAppointment.name ||
                        "Unknown Customer"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {viewingAppointment.phone ||
                        "No phone number"}
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      viewingAppointment.status
                    }
                  />
                </div>
              </div>

              {/* ALL FIELDS */}
              <div className="grid gap-4 sm:grid-cols-2">

                {Object.entries(
                  viewingAppointment
                ).map(
                  ([key, value]) => {

                    if (
                      typeof value ===
                      "function" ||
                      value === undefined
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-gray-200 p-4"
                      >

                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {formatFieldLabel(
                            key
                          )}
                        </p>

                        <p className="break-words whitespace-pre-wrap text-sm font-medium text-gray-800">
                          {formatFieldValue(
                            key,
                            value
                          )}
                        </p>
                      </div>
                    );
                  }
                )}

              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t border-gray-200 px-5 py-4 sm:px-6">

              <button
                type="button"
                onClick={() =>
                  setViewingAppointment(
                    null
                  )
                }
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-[60] flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-xl ${toast.type === "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : "border-red-200 bg-red-50 text-red-800"
            }`}
          role="status"
          aria-live="polite"
        >

          <span className="text-lg">
            {toast.type === "success"
              ? "✓"
              : "!"}
          </span>

          <div>
            <p className="text-sm font-semibold">
              {toast.type === "success"
                ? "Success"
                : "Error"}
            </p>

            <p className="mt-0.5 text-sm">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setToast(null)
            }
            aria-label="Close notification"
            className="ml-2 text-lg opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}

