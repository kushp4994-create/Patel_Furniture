"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaTag,
  FaComment,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheck,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

type ContactInfoCardProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  value: string;
  description: string;
  href?: string;
  action?: string;
};

type FormInputProps = {
  id: keyof ContactForm;
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email";
  icon: ReactNode;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

type FormTextareaProps = {
  id: "message";
  label: string;
  placeholder: string;
  icon: ReactNode;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <div
        className={`flex items-center gap-3 ${center ? "justify-center" : "justify-start"
          }`}
      >
        <span
          className={`h-px w-8 sm:w-10 ${light ? "bg-[#e0b15c]" : "bg-[#e0b15c]"
            }`}
        />

        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] ${light ? "text-[#5fb3a9]" : "text-[#5fb3a9]"
            }`}
        >
          {eyebrow}
        </p>
      </div>

      <h2
        className={`mt-5 text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[38px] lg:text-[44px] ${light ? "text-white" : "text-[#252525]"
          }`}
      >
        {title}
      </h2>

      <div
        className={`mt-5 flex items-center gap-2 ${center ? "justify-center" : "justify-start"
          }`}
      >
        <span className="h-[2px] w-10 bg-[#e0b15c]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#e0b15c]" />
      </div>

      {description && (
        <p
          className={`mt-6 text-[14px] leading-7 sm:text-[15px] sm:leading-8 ${center ? "mx-auto max-w-[720px]" : "max-w-[650px]"
            } ${light ? "text-white/60" : "text-[#6b7280]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   CONTACT INFORMATION CARD
========================================================= */

function ContactInfoCard({
  icon,
  eyebrow,
  title,
  value,
  description,
  href,
  action,
}: ContactInfoCardProps) {
  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center border border-[#5fb3a9]/20 bg-[#5fb3a9]/10 text-[#5fb3a9] transition-all duration-300 group-hover:bg-[#5fb3a9] group-hover:text-white">
          {icon}
        </div>

        <span className="h-px w-7 bg-[#e0b15c] transition-all duration-300 group-hover:w-11" />
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5fb3a9]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.015em] text-[#252525]">
        {title}
      </h3>

      <p className="mt-3 break-words text-[14px] font-medium leading-6 text-[#333]">
        {value}
      </p>

      <p className="mt-1.5 text-[12px] leading-5 text-[#737373]">
        {description}
      </p>

      {href && action && (
        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5fb3a9]">
            {action}

            <FaArrowRight
              size={9}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="group h-full border border-[#e1ded8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5fb3a9]/50 hover:shadow-[0_20px_50px_rgba(37,37,37,0.07)] sm:p-7">
      {href ? (
        <a
          href={href}
          className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#e0b15c] focus-visible:ring-offset-4"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

function FormInput({
  id,
  label,
  placeholder,
  type,
  icon,
  value,
  error,
  required = false,
  onChange,
}: FormInputProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#444]"
      >
        {label}

        {required && (
          <span
            className="ml-1 text-[#5fb3a9]"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <div className="group relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#b28a48] transition-colors duration-200 group-focus-within:text-[#5fb3a9]"
          aria-hidden="true"
        >
          {icon}
        </span>

        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          autoComplete={
            id === "name"
              ? "name"
              : id === "email"
                ? "email"
                : id === "phone"
                  ? "tel"
                  : "off"
          }
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`h-[58px] w-full rounded-none border bg-[#fafafa] pl-11 pr-4 text-[14px] text-[#252525] outline-none transition-all duration-200 placeholder:text-[#a1a1a1] focus:bg-white focus:ring-2 ${error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-[#dddddd] focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/10"
            }`}
        />
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-[11px] leading-5 text-red-600"
        >
          <FaExclamationTriangle
            size={9}
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   FORM TEXTAREA
========================================================= */

function FormTextarea({
  id,
  label,
  placeholder,
  icon,
  value,
  error,
  required = false,
  onChange,
}: FormTextareaProps) {
  const errorId = `${id}-error`;

  return (
    <div className="md:col-span-2">
      <label
        htmlFor={id}
        className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#444]"
      >
        {label}

        {required && (
          <span
            className="ml-1 text-[#5fb3a9]"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <div className="group relative">
        <span
          className="pointer-events-none absolute left-4 top-5 z-10 text-[#b28a48] transition-colors duration-200 group-focus-within:text-[#5fb3a9]"
          aria-hidden="true"
        >
          {icon}
        </span>

        <textarea
          id={id}
          name={id}
          rows={6}
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`min-h-[170px] w-full resize-none rounded-none border bg-[#fafafa] px-4 py-4 pl-11 text-[14px] leading-7 text-[#252525] outline-none transition-all duration-200 placeholder:text-[#a1a1a1] focus:bg-white focus:ring-2 ${error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-[#dddddd] focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/10"
            }`}
        />
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-[11px] leading-5 text-red-600"
        >
          <FaExclamationTriangle
            size={9}
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const updateField = (
    field: keyof ContactForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    if (status.type) {
      setStatus({
        type: null,
        message: "",
      });
    }
  };

  /* =======================================================
     VALIDATE FORM
  ======================================================= */

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!phone) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (!/^[+()\-\s\d]{7,20}$/.test(phone)) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!email) {
      newErrors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!subject) {
      newErrors.subject =
        "Please enter a subject.";
    }

    if (!message) {
      newErrors.message =
        "Please enter your message.";
    } else if (message.length < 10) {
      newErrors.message =
        "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  /* =======================================================
     SUBMIT FORM
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setStatus({
      type: null,
      message: "",
    });

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data: { message?: string } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Something went wrong. Please try again."
        );
      }

      setStatus({
        type: "success",
        message:
          data.message ||
          "Your message has been received. Our team will get back to you shortly.",
      });

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full overflow-x-hidden bg-[#f5f5f5] text-[#252525]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative flex min-h-[330px] items-center justify-center overflow-hidden sm:min-h-[390px] lg:min-h-[460px]">

        {/* Background image */}

        <div className="absolute inset-0">
          <img
            src="/images/about-banner.png"
            alt=""
            className="h-full w-full object-cover object-center"
            aria-hidden="true"
          />
        </div>

        {/* Premium overlay */}

        <div
          className="absolute inset-0 bg-gradient-to-b from-[#111]/50 via-[#111]/60 to-[#111]/80"
          aria-hidden="true"
        />

        {/* Decorative glow */}

        <div
          className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#5fb3a9]/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#e0b15c]/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Hero content */}

        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#e0b15c] sm:w-10" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e0b15c] sm:text-[11px]">
              Get In Touch
            </p>

            <span className="h-px w-8 bg-[#e0b15c] sm:w-10" />
          </div>

          <h1 className="mt-5 text-[40px] font-semibold leading-none tracking-[-0.035em] text-white sm:text-5xl md:text-[58px] lg:text-[64px]">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-[520px] text-[14px] leading-7 text-white/70 sm:text-[15px]">
            Let&apos;s create something beautiful for your space.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-[2px] w-10 bg-[#e0b15c]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#e0b15c]" />
          </div>

          <nav
            aria-label="Breadcrumb"
            className="mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-white/55 sm:text-[11px]"
          >
            <a
              href="/"
              className="transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white"
            >
              Home
            </a>

            <span
              className="mx-3 text-[#e0b15c]"
              aria-hidden="true"
            >
              /
            </span>

            <span className="text-white">
              Contact
            </span>
          </nav>
        </div>

        {/* Bottom accent */}

        <div
          className="absolute bottom-0 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-[#e0b15c]"
          aria-hidden="true"
        />
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[850px]">
          <SectionHeading
            eyebrow="Let&apos;s Connect"
            title="Let&apos;s Start a Conversation"
            description="Whether you're looking for premium furniture, planning a custom project, or need assistance with an existing order, our team is here to help."
            center
          />
        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION CARDS
      ====================================================== */}

      <section className="bg-[#f5f5f5] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">

          <ContactInfoCard
            icon={<FaMapMarkerAlt size={16} />}
            eyebrow="Visit Our Showroom"
            title="Come See Us"
            value="Patel Furniture Showroom"
            description="Ahmedabad, Gujarat, India"
          />

          <ContactInfoCard
            icon={<FaPhoneAlt size={14} />}
            eyebrow="Call Us"
            title="Speak With Our Team"
            value="+91 99799 29068"
            description="Mon - Sat · 10:00 AM - 7:00 PM"
            href="tel:+919979929068"
            action="Call Now"
          />

          <ContactInfoCard
            icon={<FaEnvelope size={16} />}
            eyebrow="Email Us"
            title="Send Us a Message"
            value="info@patelfurniture.com"
            description="We usually respond within one business day."
            href="mailto:info@patelfurniture.com"
            action="Email Us"
          />
        </div>
      </section>

      {/* =====================================================
          MAIN CONTACT SECTION
      ====================================================== */}

      <section
        id="contact"
        className="relative overflow-hidden bg-[#202020]"
      >

        {/* Background image */}

        <div className="absolute inset-0">
          <img
            src="/images/map-bg.png"
            alt=""
            className="h-full w-full object-cover object-center opacity-20"
            aria-hidden="true"
          />
        </div>

        {/* Dark overlay */}

        <div
          className="absolute inset-0 bg-[#202020]/90"
          aria-hidden="true"
        />

        {/* Decorative shapes */}

        <div
          className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#5fb3a9]/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#e0b15c]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1250px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-9">

            {/* =================================================
                LEFT INFORMATION PANEL
            ================================================== */}

            <div className="relative flex flex-col overflow-hidden border border-white/10 bg-[#242424] p-7 sm:p-9 lg:p-10">

              {/* Top gold accent */}

              <div
                className="absolute right-0 top-0 h-[2px] w-24 bg-[#e0b15c]"
                aria-hidden="true"
              />

              {/* Corner */}

              <div
                className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[#e0b15c]/30"
                aria-hidden="true"
              />

              <SectionHeading
                eyebrow="Contact Information"
                title="We'd Love To Hear From You"
                description="Have a question about our furniture, need help choosing the right piece, or planning a custom interior project? Our team is here to help."
                light
              />

              {/* Information */}

              <div className="mt-10 space-y-0">

                {/* ADDRESS */}

                <div className="flex gap-4 border-b border-white/10 pb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#5fb3a9]/30 bg-[#5fb3a9]/10 text-[#5fb3a9]">
                    <FaMapMarkerAlt
                      size={14}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0b15c]">
                      Address
                    </p>

                    <p className="mt-2 text-[13px] leading-6 text-white/65">
                      Patel Furniture Showroom
                      <br />
                      Ahmedabad, Gujarat, India
                    </p>
                  </div>
                </div>

                {/* PHONE */}

                <div className="flex gap-4 border-b border-white/10 py-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#5fb3a9]/30 bg-[#5fb3a9]/10 text-[#5fb3a9]">
                    <FaPhoneAlt
                      size={13}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0b15c]">
                      Phone
                    </p>

                    <a
                      href="tel:+919979929068"
                      className="mt-2 block text-[13px] text-white/65 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b15c]"
                    >
                      +91 99799 29068
                    </a>
                  </div>
                </div>

                {/* EMAIL */}

                <div className="flex gap-4 border-b border-white/10 py-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#5fb3a9]/30 bg-[#5fb3a9]/10 text-[#5fb3a9]">
                    <FaEnvelope
                      size={14}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0b15c]">
                      Email
                    </p>

                    <a
                      href="mailto:info@patelfurniture.com"
                      className="mt-2 block break-all text-[13px] text-white/65 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b15c]"
                    >
                      info@patelfurniture.com
                    </a>
                  </div>
                </div>

                {/* WORKING HOURS */}

                <div className="flex gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#5fb3a9]/30 bg-[#5fb3a9]/10 text-[#5fb3a9]">
                    <FaClock
                      size={14}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e0b15c]">
                      Working Hours
                    </p>

                    <p className="mt-2 text-[13px] leading-6 text-white/65">
                      Monday - Saturday
                      <br />
                      10:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* MINI CTA */}

              <div className="mt-auto pt-10">
                <div className="border-t border-white/10 pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e0b15c]">
                    Ready To Discuss Your Space?
                  </p>

                  <p className="mt-2 max-w-[300px] text-[13px] leading-6 text-white/50">
                    Let&apos;s talk about your furniture requirements and
                    find the right solution for your space.
                  </p>

                  <a
                    href="tel:+919979929068"
                    className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#5fb3a9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b15c]"
                  >
                    Call Our Team

                    <FaArrowRight
                      size={9}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT FORM PANEL
            ================================================== */}

            <div className="border border-[#e8e5df] bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.14)] sm:p-8 lg:p-10">

              <SectionHeading
                eyebrow="Send A Message"
                title="Get In Touch"
                description="Tell us what you're looking for and our team will get back to you shortly."
              />

              {/* STATUS */}

              {status.type && (
                <div
                  role={
                    status.type === "success"
                      ? "status"
                      : "alert"
                  }
                  aria-live="polite"
                  className={`mt-8 flex gap-3 border p-4 ${status.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-700"
                    }`}
                >
                  <div
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    {status.type === "success" ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <FaCheck size={11} />
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                        <FaExclamationTriangle size={11} />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold">
                      {status.type === "success"
                        ? "Message Sent Successfully"
                        : "Unable To Send Message"}
                    </p>

                    <p className="mt-1 text-[12px] leading-5 opacity-80">
                      {status.message}
                    </p>
                  </div>
                </div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2"
              >
                {/* FULL NAME */}

                <FormInput
                  id="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                  icon={<FaUser size={12} />}
                  value={form.name}
                  error={errors.name}
                  required
                  onChange={(value) =>
                    updateField("name", value)
                  }
                />

                {/* PHONE */}

                <FormInput
                  id="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  icon={<FaPhoneAlt size={12} />}
                  value={form.phone}
                  error={errors.phone}
                  required
                  onChange={(value) =>
                    updateField("phone", value)
                  }
                />

                {/* EMAIL */}

                <FormInput
                  id="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  type="email"
                  icon={<FaEnvelope size={12} />}
                  value={form.email}
                  error={errors.email}
                  required
                  onChange={(value) =>
                    updateField("email", value)
                  }
                />

                {/* SUBJECT */}

                <FormInput
                  id="subject"
                  label="Subject"
                  placeholder="What can we help you with?"
                  type="text"
                  icon={<FaTag size={12} />}
                  value={form.subject}
                  error={errors.subject}
                  required
                  onChange={(value) =>
                    updateField("subject", value)
                  }
                />

                {/* MESSAGE */}

                <FormTextarea
                  id="message"
                  label="Message"
                  placeholder="Tell us about your requirements..."
                  icon={<FaComment size={12} />}
                  value={form.message}
                  error={errors.message}
                  required
                  onChange={(value) =>
                    updateField("message", value)
                  }
                />

                {/* SUBMIT */}

                <div className="pt-1 md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      inline-flex
                      min-h-[54px]
                      w-full
                      items-center
                      justify-center
                      gap-3
                      bg-[#5fb3a9]
                      px-8
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white
                      transition-all
                      duration-300
                      ease-out
                      hover:-translate-y-0.5
                      hover:bg-[#4d9d94]
                      hover:shadow-[0_12px_30px_rgba(77,157,148,0.2)]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#e0b15c]
                      focus:ring-offset-2
                      disabled:cursor-not-allowed
                      disabled:translate-y-0
                      disabled:opacity-60
                      sm:w-auto
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          aria-hidden="true"
                        />

                        <span>
                          Sending...
                        </span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane
                          size={10}
                          aria-hidden="true"
                        />

                        <span>
                          Send Message
                        </span>

                        <FaArrowRight
                          size={9}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* FORM FOOTER */}

              <div className="mt-8 border-t border-[#ece9e3] pt-5">
                <div className="flex items-start gap-2">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e0b15c]"
                    aria-hidden="true"
                  />

                  <p className="text-[10px] leading-5 text-[#969696]">
                    By submitting this form, you agree to be contacted
                    by our team regarding your enquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}