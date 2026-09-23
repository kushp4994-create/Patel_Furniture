"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* =========================================================
   Types
========================================================= */

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;

  // Optional fields — only used if your API already returns them
  createdAt?: string | Date | null;
  date?: string | Date | null;
  status?: string | null;
  read?: boolean | null;
  isRead?: boolean | null;
}

interface DeleteModalProps {
  contact: Contact | null;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
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

function MailIcon() {
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
        d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 7 8 6 8-6"
      />
    </svg>
  );
}

function TrashIcon() {
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
        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
      />
    </svg>
  );
}

function AlertIcon() {
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
        d="M12 9v4m0 4h.01M10.3 4.8 2.7 18a2 2 0 0 0 1.73 3h15.14a2 2 0 0 0 1.73-3L13.7 4.8a2 2 0 0 0-3.4 0Z"
      />
    </svg>
  );
}

/* =========================================================
   Helpers
========================================================= */

function getContactDate(contact: Contact): string | null {
  const value = contact.createdAt ?? contact.date;

  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isToday(contact: Contact): boolean {
  const value = contact.createdAt ?? contact.date;

  if (!value) return false;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function hasStatusData(contacts: Contact[]): boolean {
  return contacts.some(
    (contact) =>
      contact.status !== undefined ||
      contact.read !== undefined ||
      contact.isRead !== undefined
  );
}

function isUnread(contact: Contact): boolean {
  if (typeof contact.read === "boolean") {
    return !contact.read;
  }

  if (typeof contact.isRead === "boolean") {
    return !contact.isRead;
  }

  if (typeof contact.status === "string") {
    return contact.status.toLowerCase() === "unread";
  }

  return false;
}

/* =========================================================
   Loading Skeleton
========================================================= */

function LoadingState() {
  return (
    <div
      className="space-y-4"
      aria-label="Loading contact messages"
      aria-busy="true"
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-1 gap-4">
              <div className="h-11 w-11 rounded-full bg-stone-200" />

              <div className="flex-1">
                <div className="h-4 w-40 rounded bg-stone-200" />
                <div className="mt-2 h-3 w-52 rounded bg-stone-200" />
              </div>
            </div>

            <div className="h-8 w-20 rounded bg-stone-200" />
          </div>

          <div className="mt-5 space-y-2">
            <div className="h-3 w-full rounded bg-stone-200" />
            <div className="h-3 w-4/5 rounded bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   Empty State
========================================================= */

function EmptyState({ searched }: { searched: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3eee7] text-[#8b7355]">
        <MailIcon />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-stone-900">
        {searched ? "No messages found" : "No contact messages yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
        {searched
          ? "Try searching with a different name, email address, or message."
          : "Contact messages submitted from your website will appear here."}
      </p>
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
      className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800"
    >
      <div className="flex items-start gap-3">
        <AlertIcon />

        <div className="flex-1">
          <h3 className="font-semibold">Unable to load messages</h3>

          <p className="mt-1 text-sm text-red-700">{message}</p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Delete Confirmation Modal
========================================================= */

function DeleteConfirmModal({
  contact,
  deleting,
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  if (!contact) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <TrashIcon />
        </div>

        <h2
          id="delete-dialog-title"
          className="mt-5 text-xl font-semibold text-stone-900"
        >
          Delete message?
        </h2>

        <p
          id="delete-dialog-description"
          className="mt-2 text-sm leading-6 text-stone-500"
        >
          Are you sure you want to delete this message? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={deleting}
            onClick={onCancel}
            className="rounded-xl border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Contact Card
========================================================= */

function ContactCard({
  contact,
  onDelete,
}: {
  contact: Contact;
  onDelete: (contact: Contact) => void;
}) {
  const formattedDate = getContactDate(contact);

  return (
    <article className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3eee7] text-sm font-semibold text-[#806a4e]">
            {contact.name?.charAt(0)?.toUpperCase() || "?"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-stone-900">
              {contact.name || "Unknown"}
            </h3>

            <a
              href={`mailto:${contact.email}`}
              className="mt-0.5 block truncate text-sm text-stone-500 transition hover:text-[#806a4e]"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {isUnread(contact) && (
          <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            New
          </span>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-stone-50 p-4">
        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-stone-700">
          {contact.message}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
        {formattedDate ? (
          <time className="text-xs text-stone-400">{formattedDate}</time>
        ) : (
          <span className="text-xs text-stone-400">Date unavailable</span>
        )}

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}`}
            aria-label={`Reply to ${contact.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-[#8b7355] hover:bg-[#faf7f2] hover:text-[#806a4e] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2"
          >
            <MailIcon />
            Reply
          </a>

          <button
            type="button"
            onClick={() => onDelete(contact)}
            aria-label={`Delete message from ${contact.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   Desktop Table
========================================================= */

function ContactTable({
  contacts,
  onDelete,
}: {
  contacts: Contact[];
  onDelete: (contact: Contact) => void;
}) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Customer
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Message
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Submitted
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            {contacts.map((contact) => {
              const formattedDate = getContactDate(contact);

              return (
                <tr
                  key={contact.id}
                  className="transition hover:bg-stone-50/60"
                >
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3eee7] text-sm font-semibold text-[#806a4e]">
                        {contact.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-stone-900">
                          {contact.name || "Unknown"}
                        </p>

                        <a
                          href={`mailto:${contact.email}`}
                          className="mt-1 block max-w-[220px] truncate text-sm text-stone-500 hover:text-[#806a4e]"
                        >
                          {contact.email}
                        </a>

                        {isUnread(contact) && (
                          <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="max-w-[400px] px-6 py-5 align-top">
                    <p className="line-clamp-3 whitespace-pre-wrap break-words text-sm leading-6 text-stone-600">
                      {contact.message}
                    </p>
                  </td>

                  <td className="px-6 py-5 align-top">
                    {formattedDate ? (
                      <time className="whitespace-nowrap text-sm text-stone-500">
                        {formattedDate}
                      </time>
                    ) : (
                      <span className="text-sm text-stone-400">
                        Date unavailable
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 align-top">
                    <div className="flex justify-end gap-2">
                      <a
                        href={`mailto:${contact.email}`}
                        aria-label={`Reply to ${contact.name}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-[#8b7355] hover:bg-[#faf7f2] hover:text-[#806a4e] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:ring-offset-2"
                      >
                        <MailIcon />
                        Reply
                      </a>

                      <button
                        type="button"
                        onClick={() => onDelete(contact)}
                        aria-label={`Delete message from ${contact.name}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <TrashIcon />
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
    </div>
  );
}

/* =========================================================
   Main Component
========================================================= */

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  /* -------------------------------------------------------
     Fetch Contacts
  ------------------------------------------------------- */

  const fetchContacts = useCallback(async (isRefresh = false) => {
    try {
      setError(null);

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch("/api/contact", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Unable to fetch contact messages (${response.status})`
        );
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response received from the server.");
      }

      const validContacts = data.filter((item): item is Contact => {
        if (!item || typeof item !== "object") {
          return false;
        }

        const contact = item as Record<string, unknown>;

        return (
          typeof contact.id === "number" &&
          typeof contact.name === "string" &&
          typeof contact.email === "string" &&
          typeof contact.message === "string"
        );
      });

      setContacts(validContacts);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading messages."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchContacts();
  }, [fetchContacts]);

  /* -------------------------------------------------------
     Search
  ------------------------------------------------------- */

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query)
      );
    });
  }, [contacts, search]);

  /* -------------------------------------------------------
     Statistics
  ------------------------------------------------------- */

  const statistics = useMemo(() => {
    const hasDate = contacts.some(
      (contact) => contact.createdAt != null || contact.date != null
    );

    const hasStatus = hasStatusData(contacts);

    return {
      total: contacts.length,
      today: hasDate
        ? contacts.filter((contact) => isToday(contact)).length
        : null,
      unread: hasStatus
        ? contacts.filter((contact) => isUnread(contact)).length
        : null,
      hasDate,
      hasStatus,
    };
  }, [contacts]);

  /* -------------------------------------------------------
     Delete
  ------------------------------------------------------- */

  const openDeleteModal = (contact: Contact) => {
    if (deletingId !== null) return;

    setSelectedContact(contact);
  };

  const closeDeleteModal = () => {
    if (deletingId !== null) return;

    setSelectedContact(null);
  };

  const handleDelete = async () => {
    if (!selectedContact || deletingId !== null) {
      return;
    }

    const id = selectedContact.id;

    try {
      setDeletingId(id);
      setError(null);

      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        let errorMessage = "Unable to delete this message.";

        try {
          const data: unknown = await response.json();

          if (
            data &&
            typeof data === "object" &&
            "message" in data &&
            typeof data.message === "string"
          ) {
            errorMessage = data.message;
          }
        } catch {
          // Ignore invalid JSON error response
        }

        throw new Error(errorMessage);
      }

      // Optimistically remove the deleted item.
      setContacts((current) =>
        current.filter((contact) => contact.id !== id)
      );

      setSelectedContact(null);
    } catch (err) {
      console.error("Failed to delete contact:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while deleting the message."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* -------------------------------------------------------
     Render
  ------------------------------------------------------- */

  return (
    <>
      <main className="min-h-screen bg-[#f7f5f2] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a8060]">
                Customer communication
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Contact Messages
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                Manage customer enquiries and respond to messages from your
                furniture website.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void fetchContacts(true)}
              disabled={loading || refreshing}
              aria-label="Refresh contact messages"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <RefreshIcon spinning={refreshing} />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </header>

          {/* Statistics */}
          {!loading && contacts.length > 0 && (
            <section
              aria-label="Contact statistics"
              className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-stone-500">
                  Total Messages
                </p>

                <p className="mt-2 text-3xl font-semibold text-stone-900">
                  {statistics.total}
                </p>
              </div>

              {statistics.hasDate && (
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-stone-500">
                    Today&apos;s Messages
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-stone-900">
                    {statistics.today}
                  </p>
                </div>
              )}

              {statistics.hasStatus && (
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-stone-500">
                    Unread / New
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-stone-900">
                    {statistics.unread}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Toolbar */}
          {!loading && contacts.length > 0 && (
            <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                    <SearchIcon />
                  </div>

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name, email or message..."
                    aria-label="Search contact messages"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9a8060] focus:bg-white focus:ring-2 focus:ring-[#9a8060]/15"
                  />
                </div>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                  >
                    Clear
                  </button>
                )}
              </div>

              {search && (
                <p className="px-1 pt-3 text-xs text-stone-400">
                  Showing {filteredContacts.length} of {contacts.length}{" "}
                  messages
                </p>
              )}
            </section>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5">
              <ErrorState
                message={error}
                onRetry={() => void fetchContacts()}
              />
            </div>
          )}

          {/* Content */}
          {loading ? (
            <LoadingState />
          ) : filteredContacts.length === 0 ? (
            <EmptyState searched={Boolean(search)} />
          ) : (
            <>
              {/* Desktop */}
              <ContactTable
                contacts={filteredContacts}
                onDelete={openDeleteModal}
              />

              {/* Mobile */}
              <div className="space-y-4 md:hidden">
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onDelete={openDeleteModal}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Delete Modal */}
      <DeleteConfirmModal
        contact={selectedContact}
        deleting={deletingId !== null}
        onCancel={closeDeleteModal}
        onConfirm={() => void handleDelete()}
      />
    </>
  );
}