// "use client"

// import { useState } from "react"

// export default function ContactForm({ productName }: any) {

//   const [open,setOpen] = useState(false)

//   async function handleSubmit(e:any){
//     e.preventDefault()

//     const form = new FormData(e.target)

//     await fetch("/api/contact",{
//       method:"POST",
//       headers:{ "Content-Type":"application/json" },
//       body:JSON.stringify({
//         name:form.get("name"),
//         email:form.get("email"),
//         phone:form.get("phone"),
//         message:form.get("message"),
//         subject:`Product: ${productName}`
//       })
//     })

//     alert("Contact Sent")
//   }

//   return(

//     <div>

//       <button
//         onClick={()=>setOpen(!open)}
//         className="bg-blue-600 text-white px-6 py-2 rounded"
//       >
//         Contact
//       </button>

//       {open && (

//         <form onSubmit={handleSubmit} className="mt-4 space-y-3">

//           <input
//             name="name"
//             placeholder="Name"
//             className="border p-2 w-full"
//           />

//           <input
//             name="email"
//             placeholder="Email"
//             className="border p-2 w-full"
//           />

//           <input
//             name="phone"
//             placeholder="Phone"
//             className="border p-2 w-full"
//           />

//           <textarea
//             name="message"
//             placeholder="Message"
//             className="border p-2 w-full"
//           />

//           <button className="bg-black text-white px-4 py-2">
//             Submit
//           </button>

//         </form>

//       )}

//     </div>

//   )
// }



"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

interface ContactFormProps {
  productName: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;

export default function ContactForm({
  productName,
}: ContactFormProps) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setOpen((previous) => !previous);

    if (!open) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((previous) => ({
        ...previous,
        [name]: undefined,
      }));
    }

    if (apiError) {
      setApiError("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (name.length > 100) {
      newErrors.name = "Name must be less than 100 characters.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[+]?[\d\s()-]{7,20}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!message) {
      newErrors.message = "Please enter your message.";
    } else if (message.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
    }

    return newErrors;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSuccessMessage("");
    setApiError("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      if (validationErrors.name) {
        nameInputRef.current?.focus();
      }

      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          subject: `Product: ${productName}`,
        }),
      });

      let responseData: ApiErrorResponse | null = null;

      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }

      if (!response.ok) {
        throw new Error(
          responseData?.message ||
          responseData?.error ||
          "Unable to send your message. Please try again."
        );
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setSuccessMessage(
        "Your message has been sent successfully. We'll get back to you soon."
      );
    } catch (error) {
      console.error("Contact submission error:", error);

      setApiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageLength = form.message.length;

  return (
    <div className="w-full">
      {/* Contact Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="product-contact-panel"
        className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#5fb3a9]/20 sm:w-auto ${open
          ? "bg-[#4fa69c] text-white shadow-md"
          : "bg-[#5fb3a9] text-white hover:bg-[#4fa69c] hover:shadow-md"
          }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border border-white/40 text-xs transition-transform duration-200 ${open ? "rotate-45" : ""
            }`}
        >
          +
        </span>

        {open ? "Close Contact Form" : "Contact Us"}
      </button>

      {/* Contact Panel */}
      {open && (
        <section
          id="product-contact-panel"
          aria-labelledby="contact-form-title"
          className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/40"
        >
          {/* Header */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#f7fcfb] to-white px-5 py-6 sm:px-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5fb3a9]/10 text-lg text-[#4b9d94]">
                ☎
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4b9d94]">
                  Get in touch
                </p>

                <h2
                  id="contact-form-title"
                  className="mt-1 text-xl font-bold tracking-tight text-gray-900"
                >
                  Contact Us
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  Have a question about{" "}
                  <span className="font-semibold text-gray-700">
                    {productName}
                  </span>
                  ? Send us a message and our team will get
                  back to you.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-5 sm:p-7"
          >
            {/* API Error */}
            {apiError && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                  !
                </div>

                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Unable to send message
                  </p>

                  <p className="mt-1 text-sm leading-5 text-red-700">
                    {apiError}
                  </p>
                </div>
              </div>
            )}

            {/* Success */}
            {successMessage && (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Message Sent Successfully
                  </p>

                  <p className="mt-1 text-sm leading-5 text-emerald-700">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    👤
                  </span>

                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name
                        ? "contact-name-error"
                        : undefined
                    }
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-50 ${errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/10"
                      }`}
                  />
                </div>

                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    ✉
                  </span>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "contact-email-error"
                        : undefined
                    }
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-50 ${errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/10"
                      }`}
                  />
                </div>

                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    ☎
                  </span>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone
                        ? "contact-phone-error"
                        : undefined
                    }
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-50 ${errors.phone
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/10"
                      }`}
                  />
                </div>

                {errors.phone && (
                  <p
                    id="contact-phone-error"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Message
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <span
                    className={`text-xs font-medium ${messageLength >= MIN_MESSAGE_LENGTH
                      ? "text-emerald-600"
                      : "text-gray-400"
                      }`}
                  >
                    {messageLength}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? "contact-message-error"
                      : "contact-message-help"
                  }
                  className={`w-full resize-y rounded-xl border bg-white px-4 py-3.5 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-50 ${errors.message
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-[#5fb3a9] focus:ring-[#5fb3a9]/10"
                    }`}
                />

                {errors.message ? (
                  <p
                    id="contact-message-error"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {errors.message}
                  </p>
                ) : (
                  <p
                    id="contact-message-help"
                    className="mt-2 text-xs text-gray-400"
                  >
                    Please provide at least {MIN_MESSAGE_LENGTH}{" "}
                    characters.
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-7 border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#5fb3a9] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#4fa69c] hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#5fb3a9]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-gray-400">
                <span aria-hidden="true">🔒</span>

                <p>
                  We'll only use your information to respond to
                  your message.
                </p>
              </div>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}