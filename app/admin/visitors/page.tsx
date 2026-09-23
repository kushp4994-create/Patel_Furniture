
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* =========================================================
   Types
========================================================= */

interface Visitor {
  id: number;
  ip: string;
  userAgent: string;
  createdAt: string;
}

type DateFilter = "today" | "7days" | "30days" | "all";
type SortOption = "latest" | "oldest" | "ip";

interface VisitorInfo {
  browser: string;
  os: string;
  device: string;
}

/* =========================================================
   User Agent Parser
========================================================= */

function parseUserAgent(userAgent: string): VisitorInfo {
  const ua = userAgent.toLowerCase();

  let browser = "Unknown";
  let os = "Unknown";
  let device = "Unknown";

  // Browser detection
  if (/edg\//i.test(userAgent)) {
    browser = "Microsoft Edge";
  } else if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) {
    browser = "Opera";
  } else if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) {
    browser = "Chrome";
  } else if (/firefox\//i.test(userAgent)) {
    browser = "Firefox";
  } else if (
    /safari\//i.test(userAgent) &&
    !/chrome\//i.test(userAgent)
  ) {
    browser = "Safari";
  } else if (/msie|trident/i.test(userAgent)) {
    browser = "Internet Explorer";
  }

  // OS detection
  if (/windows nt/i.test(userAgent)) {
    os = "Windows";
  } else if (/mac os x/i.test(userAgent)) {
    os = "macOS";
  } else if (/android/i.test(userAgent)) {
    os = "Android";
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = "iOS";
  } else if (/linux/i.test(userAgent)) {
    os = "Linux";
  }

  // Device detection
  if (/ipad/i.test(userAgent)) {
    device = "iPad";
  } else if (/iphone/i.test(userAgent)) {
    device = "iPhone";
  } else if (/android/i.test(userAgent)) {
    device = /mobile/i.test(userAgent) ? "Android Phone" : "Android Tablet";
  } else if (/mobile/i.test(userAgent)) {
    device = "Mobile";
  } else if (/tablet/i.test(userAgent)) {
    device = "Tablet";
  } else if (
    /windows|macintosh|linux/i.test(userAgent)
  ) {
    device = "Desktop";
  }

  // Better Safari naming
  if (
    browser === "Safari" &&
    (/iphone|ipad|ipod/i.test(userAgent))
  ) {
    browser = "Mobile Safari";
  }

  return {
    browser,
    os,
    device,
  };
}

/* =========================================================
   Date Helpers
========================================================= */

function getValidDate(value: string): Date | null {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isToday(date: Date): boolean {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function isWithinLastDays(date: Date, days: number): boolean {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  start.setDate(start.getDate() - (days - 1));

  return date.getTime() >= start.getTime() && date.getTime() <= now.getTime();
}

function formatDate(dateString: string): string {
  const date = getValidDate(dateString);

  if (!date) {
    return "Unknown date";
  }

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string): string {
  const date = getValidDate(dateString);

  if (!date) {
    return "Unknown time";
  }

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* =========================================================
   Icons
========================================================= */

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}

function RefreshIcon({ spinning = false }: { spinning?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
      />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path
        strokeLinecap="round"
        d="M8 21h8M12 18v3"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* =========================================================
   Statistics Card
========================================================= */

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-stone-400">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee7] text-[#806a4e]">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Loading Skeleton
========================================================= */

function LoadingState() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
      aria-busy="true"
      aria-label="Loading visitors"
    >
      <div className="animate-pulse">
        <div className="h-14 border-b border-stone-200 bg-stone-50" />

        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="grid grid-cols-5 gap-6 border-b border-stone-100 px-6 py-5"
          >
            <div className="h-4 w-12 rounded bg-stone-200" />
            <div className="h-4 w-32 rounded bg-stone-200" />
            <div className="h-4 w-28 rounded bg-stone-200" />
            <div className="h-4 w-36 rounded bg-stone-200" />
            <div className="h-4 w-20 rounded bg-stone-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Error State
========================================================= */

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-red-900">
            Unable to load visitors
          </h3>

          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   Empty State
========================================================= */

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3eee7] text-[#806a4e]">
        <GlobeIcon />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-stone-900">
        {filtered ? "No visitors match your filters" : "No visitors found"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
        {filtered
          ? "Try changing your search, date filter, or sorting options."
          : "Visitors to your website will appear here once tracking data is available."}
      </p>
    </div>
  );
}

/* =========================================================
   Details Modal
========================================================= */

function VisitorDetailsModal({
  visitor,
  onClose,
}: {
  visitor: Visitor | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!visitor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visitor, onClose]);

  if (!visitor) return null;

  const info = parseUserAgent(visitor.userAgent);

  const date = getValidDate(visitor.createdAt);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="visitor-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9a8060]">
              Visitor information
            </p>

            <h2
              id="visitor-details-title"
              className="mt-1 text-xl font-semibold text-stone-900"
            >
              Visitor Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close visitor details"
            className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
          >
            <XIcon />
          </button>
        </div>

        {/* Modal Content */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                IP Address
              </p>

              <p className="mt-2 break-all font-mono text-sm font-medium text-stone-900">
                {visitor.ip || "Unknown"}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Visitor ID
              </p>

              <p className="mt-2 font-mono text-sm font-medium text-stone-900">
                {visitor.id}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Browser
              </p>

              <p className="mt-2 text-sm font-semibold text-stone-900">
                {info.browser}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Operating System
              </p>

              <p className="mt-2 text-sm font-semibold text-stone-900">
                {info.os}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Device
              </p>

              <p className="mt-2 text-sm font-semibold text-stone-900">
                {info.device}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Visit Date
              </p>

              <p className="mt-2 text-sm font-semibold text-stone-900">
                {date ? formatDate(visitor.createdAt) : "Unknown"}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4 sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Visit Time
              </p>

              <p className="mt-2 text-sm font-semibold text-stone-900">
                {date ? formatTime(visitor.createdAt) : "Unknown"}
              </p>
            </div>
          </div>

          {/* Full User Agent */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Full User Agent
            </p>

            <div className="max-h-48 overflow-auto rounded-xl border border-stone-200 bg-stone-50 p-4">
              <code className="break-all font-mono text-xs leading-6 text-stone-600">
                {visitor.userAgent || "Unknown"}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Visitor Row
========================================================= */

function VisitorRow({
  visitor,
  index,
  startIndex,
  onView,
}: {
  visitor: Visitor;
  index: number;
  startIndex: number;
  onView: (visitor: Visitor) => void;
}) {
  const info = parseUserAgent(visitor.userAgent);
  const date = getValidDate(visitor.createdAt);

  return (
    <tr className="transition hover:bg-stone-50/70">
      <td className="px-6 py-5 text-sm font-medium text-stone-400">
        {startIndex + index + 1}
      </td>

      <td className="px-6 py-5">
        <span className="rounded-lg bg-stone-100 px-2.5 py-1.5 font-mono text-xs font-medium text-stone-700">
          {visitor.ip || "Unknown"}
        </span>
      </td>

      <td className="px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-stone-900">
            {info.browser}
          </p>

          <p className="mt-1 text-xs text-stone-400">
            {info.device} · {info.os}
          </p>
        </div>
      </td>

      <td className="px-6 py-5">
        {date ? (
          <div>
            <p className="text-sm font-medium text-stone-700">
              {formatDate(visitor.createdAt)}
            </p>

            <p className="mt-1 text-xs text-stone-400">
              {formatTime(visitor.createdAt)}
            </p>
          </div>
        ) : (
          <span className="text-sm text-stone-400">Unknown</span>
        )}
      </td>

      <td className="px-6 py-5 text-right">
        <button
          type="button"
          onClick={() => onView(visitor)}
          aria-label={`View details for visitor ${visitor.ip}`}
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-[#9a8060] hover:bg-[#faf7f2] hover:text-[#806a4e] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2"
        >
          <EyeIcon />
          View Details
        </button>
      </td>
    </tr>
  );
}

/* =========================================================
   Mobile Visitor Card
========================================================= */

function VisitorCard({
  visitor,
  index,
  startIndex,
  onView,
}: {
  visitor: Visitor;
  index: number;
  startIndex: number;
  onView: (visitor: Visitor) => void;
}) {
  const info = parseUserAgent(visitor.userAgent);
  const date = getValidDate(visitor.createdAt);

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3eee7] text-sm font-semibold text-[#806a4e]">
            {startIndex + index + 1}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-stone-900">
              {info.browser}
            </p>

            <p className="mt-1 text-xs text-stone-400">
              {info.device} · {info.os}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onView(visitor)}
          aria-label={`View visitor details`}
          className="shrink-0 rounded-lg border border-stone-200 p-2 text-stone-600 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
        >
          <EyeIcon />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-stone-50 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            IP Address
          </p>

          <p className="mt-1 break-all font-mono text-xs font-medium text-stone-700">
            {visitor.ip || "Unknown"}
          </p>
        </div>

        <div className="rounded-xl bg-stone-50 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            Visit
          </p>

          {date ? (
            <>
              <p className="mt-1 text-xs font-medium text-stone-700">
                {formatDate(visitor.createdAt)}
              </p>

              <p className="mt-0.5 text-[11px] text-stone-400">
                {formatTime(visitor.createdAt)}
              </p>
            </>
          ) : (
            <p className="mt-1 text-xs text-stone-400">Unknown</p>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   Main Component
========================================================= */

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");

  const [dateFilter, setDateFilter] =
    useState<DateFilter>("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("latest");

  const [pageSize, setPageSize] = useState<number>(10);

  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const [selectedVisitor, setSelectedVisitor] =
    useState<Visitor | null>(null);

  /* =======================================================
     Fetch Visitors
  ======================================================= */

  const fetchVisitors = useCallback(async (isRefresh = false) => {
    try {
      setError(null);

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await fetch("/api/admin/visitors", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          `Unable to load visitors (${res.status}).`
        );
      }

      const data: unknown = await res.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid visitor data received from the server."
        );
      }

      const validVisitors = data.filter(
        (item): item is Visitor => {
          if (!item || typeof item !== "object") {
            return false;
          }

          const visitor = item as Record<string, unknown>;

          return (
            typeof visitor.id === "number" &&
            typeof visitor.ip === "string" &&
            typeof visitor.userAgent === "string" &&
            typeof visitor.createdAt === "string"
          );
        }
      );

      setVisitors(validVisitors);
    } catch (err) {
      console.error("Failed to fetch visitors:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading visitors."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchVisitors();
  }, [fetchVisitors]);

  /* =======================================================
     Filter + Search + Sort
  ======================================================= */

  const processedVisitors = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = visitors.filter((visitor) => {
      /* Search */
      const info = parseUserAgent(visitor.userAgent);

      const matchesSearch =
        !query ||
        visitor.ip.toLowerCase().includes(query) ||
        visitor.userAgent.toLowerCase().includes(query) ||
        info.browser.toLowerCase().includes(query) ||
        info.os.toLowerCase().includes(query) ||
        info.device.toLowerCase().includes(query);

      if (!matchesSearch) {
        return false;
      }

      /* Date */
      const date = getValidDate(visitor.createdAt);

      if (!date) {
        return dateFilter === "all";
      }

      switch (dateFilter) {
        case "today":
          return isToday(date);

        case "7days":
          return isWithinLastDays(date, 7);

        case "30days":
          return isWithinLastDays(date, 30);

        case "all":
        default:
          return true;
      }
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "ip") {
        return a.ip.localeCompare(b.ip, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }

      const aTime =
        getValidDate(a.createdAt)?.getTime() ?? 0;

      const bTime =
        getValidDate(b.createdAt)?.getTime() ?? 0;

      if (sortBy === "oldest") {
        return aTime - bTime;
      }

      return bTime - aTime;
    });
  }, [visitors, search, dateFilter, sortBy]);

  /* =======================================================
     Statistics
  ======================================================= */

  const statistics = useMemo(() => {
    const today = visitors.filter((visitor) => {
      const date = getValidDate(visitor.createdAt);
      return date ? isToday(date) : false;
    }).length;

    const last7Days = visitors.filter((visitor) => {
      const date = getValidDate(visitor.createdAt);
      return date ? isWithinLastDays(date, 7) : false;
    }).length;

    const uniqueIPs = new Set(
      visitors
        .map((visitor) => visitor.ip.trim())
        .filter(Boolean)
    ).size;

    return {
      total: visitors.length,
      today,
      last7Days,
      uniqueIPs,
    };
  }, [visitors]);

  /* =======================================================
     Pagination
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(processedVisitors.length / pageSize)
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dateFilter, sortBy, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedVisitors = useMemo(() => {
    return processedVisitors.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [processedVisitors, startIndex, pageSize]);

  const startResult =
    processedVisitors.length === 0 ? 0 : startIndex + 1;

  const endResult = Math.min(
    startIndex + pageSize,
    processedVisitors.length
  );

  /* =======================================================
     Render
  ======================================================= */

  return (
    <>
      <main className="min-h-screen bg-[#f7f5f2] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* =================================================
              Header
          ================================================= */}

          <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a8060]">
                Website analytics
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Visitors
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Monitor website visitors and understand how customers
                are accessing your furniture store.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void fetchVisitors(true)}
              disabled={loading || refreshing}
              aria-label="Refresh visitors"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <RefreshIcon spinning={refreshing} />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </header>

          {/* =================================================
              Statistics
          ================================================= */}

          {!loading && !error && (
            <section
              aria-label="Visitor statistics"
              className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <StatCard
                title="Total Visitors"
                value={statistics.total}
                description="All recorded visits"
                icon={<GlobeIcon />}
              />

              <StatCard
                title="Today's Visitors"
                value={statistics.today}
                description="Visits today"
                icon={<CalendarIcon />}
              />

              <StatCard
                title="Last 7 Days"
                value={statistics.last7Days}
                description="Recent visits"
                icon={<MonitorIcon />}
              />

              <StatCard
                title="Unique IPs"
                value={statistics.uniqueIPs}
                description="Distinct IP addresses"
                icon={<GlobeIcon />}
              />
            </section>
          )}

          {/* =================================================
              Error
          ================================================= */}

          {error && (
            <div className="mb-6">
              <ErrorState
                message={error}
                onRetry={() => void fetchVisitors()}
              />
            </div>
          )}

          {/* =================================================
              Loading
          ================================================= */}

          {loading ? (
            <LoadingState />
          ) : (
            <>
              {/* =============================================
                  Toolbar
              ============================================= */}

              {!error && visitors.length > 0 && (
                <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-4">

                    {/* Search */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                        <SearchIcon />
                      </div>

                      <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                        placeholder="Search IP, browser, device or user agent..."
                        aria-label="Search visitors"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a8060] focus:bg-white focus:ring-2 focus:ring-[#9a8060]/15"
                      />
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                      {/* Date */}
                      <div className="relative">
                        <label
                          htmlFor="visitor-date-filter"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-400"
                        >
                          Date
                        </label>

                        <select
                          id="visitor-date-filter"
                          value={dateFilter}
                          onChange={(event) =>
                            setDateFilter(
                              event.target.value as DateFilter
                            )
                          }
                          className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 pr-10 text-sm font-medium text-stone-700 outline-none focus:border-[#9a8060] focus:ring-2 focus:ring-[#9a8060]/15"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="7days">
                            Last 7 Days
                          </option>
                          <option value="30days">
                            Last 30 Days
                          </option>
                        </select>

                        <div className="pointer-events-none absolute bottom-3 right-3 text-stone-400">
                          <ChevronDownIcon />
                        </div>
                      </div>

                      {/* Sort */}
                      <div className="relative">
                        <label
                          htmlFor="visitor-sort"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-400"
                        >
                          Sort
                        </label>

                        <select
                          id="visitor-sort"
                          value={sortBy}
                          onChange={(event) =>
                            setSortBy(
                              event.target.value as SortOption
                            )
                          }
                          className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 pr-10 text-sm font-medium text-stone-700 outline-none focus:border-[#9a8060] focus:ring-2 focus:ring-[#9a8060]/15"
                        >
                          <option value="latest">
                            Latest First
                          </option>

                          <option value="oldest">
                            Oldest First
                          </option>

                          <option value="ip">
                            IP Address
                          </option>
                        </select>

                        <div className="pointer-events-none absolute bottom-3 right-3 text-stone-400">
                          <ChevronDownIcon />
                        </div>
                      </div>

                      {/* Page Size */}
                      <div className="relative">
                        <label
                          htmlFor="visitor-page-size"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-400"
                        >
                          Per Page
                        </label>

                        <select
                          id="visitor-page-size"
                          value={pageSize}
                          onChange={(event) =>
                            setPageSize(
                              Number(event.target.value)
                            )
                          }
                          className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 pr-10 text-sm font-medium text-stone-700 outline-none focus:border-[#9a8060] focus:ring-2 focus:ring-[#9a8060]/15"
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                        </select>

                        <div className="pointer-events-none absolute bottom-3 right-3 text-stone-400">
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </div>

                    {/* Active filters info */}
                    {(search || dateFilter !== "all") && (
                      <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3">
                        <span className="text-xs text-stone-400">
                          {processedVisitors.length} visitor
                          {processedVisitors.length !== 1
                            ? "s"
                            : ""}{" "}
                          found
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setDateFilter("all");
                          }}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#806a4e] hover:bg-[#faf7f2]"
                        >
                          Clear filters
                          <XIcon />
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* =============================================
                  Empty State
              ============================================= */}

              {processedVisitors.length === 0 ? (
                <EmptyState
                  filtered={
                    visitors.length > 0 &&
                    Boolean(search || dateFilter !== "all")
                  }
                />
              ) : (
                <>
                  {/* =========================================
                      Desktop Table
                  ========================================= */}

                  <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[850px] border-collapse">
                        <caption className="sr-only">
                          Website visitors
                        </caption>

                        <thead>
                          <tr className="border-b border-stone-200 bg-stone-50/80 text-left">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                              #
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                              IP Address
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                              Browser / Device
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                              Visit
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-stone-100">
                          {paginatedVisitors.map(
                            (visitor, index) => (
                              <VisitorRow
                                key={visitor.id}
                                visitor={visitor}
                                index={index}
                                startIndex={startIndex}
                                onView={setSelectedVisitor}
                              />
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* =========================================
                      Mobile Cards
                  ========================================= */}

                  <div className="space-y-4 md:hidden">
                    {paginatedVisitors.map(
                      (visitor, index) => (
                        <VisitorCard
                          key={visitor.id}
                          visitor={visitor}
                          index={index}
                          startIndex={startIndex}
                          onView={setSelectedVisitor}
                        />
                      )
                    )}
                  </div>

                  {/* =========================================
                      Pagination
                  ========================================= */}

                  {processedVisitors.length > 0 && (
                    <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-stone-500">
                        Showing{" "}
                        <span className="font-semibold text-stone-700">
                          {startResult}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-stone-700">
                          {endResult}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-stone-700">
                          {processedVisitors.length}
                        </span>
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((page) =>
                              Math.max(1, page - 1)
                            )
                          }
                          className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Previous
                        </button>

                        <span className="rounded-lg bg-[#f3eee7] px-3 py-2 text-sm font-semibold text-[#806a4e]">
                          {currentPage} / {totalPages}
                        </span>

                        <button
                          type="button"
                          disabled={
                            currentPage === totalPages
                          }
                          onClick={() =>
                            setCurrentPage((page) =>
                              Math.min(
                                totalPages,
                                page + 1
                              )
                            )
                          }
                          className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Visitor Details */}
      <VisitorDetailsModal
        visitor={selectedVisitor}
        onClose={() => setSelectedVisitor(null)}
      />
    </>
  );
}

