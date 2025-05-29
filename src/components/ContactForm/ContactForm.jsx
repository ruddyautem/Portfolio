"use client";

import { useEffect, useState } from "react";
import InputField from "./InputField";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  objet: "",
  message: "",
};

const FIELDS_CONFIG = [
  { name: "name", label: "Nom", type: "text", required: true, minLength: 2 },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "objet", label: "Objet", type: "text", required: true, minLength: 2 },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    minLength: 10,
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ loading: false, notification: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          notification: { type: "success", message: data.message },
        });
        setFormData(INITIAL_FORM_STATE);
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      setStatus({
        loading: false,
        notification: {
          type: "error",
          message:
            error.message || "Une erreur est survenue. Veuillez réessayer.",
        },
      });
    }
  };

  useEffect(() => {
    if (status.notification) {
      const timer = setTimeout(
        () => setStatus((prev) => ({ ...prev, notification: null })),
        5000,
      );
      return () => clearTimeout(timer);
    }
  }, [status.notification]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-center md:text-left"
    >
      {/* Name and Email */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {FIELDS_CONFIG.slice(0, 2).map((field) => (
          <InputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
            autoComplete="off"
            className="w-full"
          />
        ))}
      </div>

      {/* Objet and Message */}
      {FIELDS_CONFIG.slice(2).map((field) => (
        <InputField
          key={field.name}
          {...field}
          value={formData[field.name]}
          onChange={handleChange}
          autoComplete="off"
          className="w-full"
        />
      ))}

      {/* Submit Button and Notification */}
      <div className="mt-2 flex flex-col items-center gap-4 md:flex-row md:items-start">
        <button
          type="submit"
          disabled={status.loading}
          className="group border-accent hover:bg-accent relative h-12 w-32 overflow-hidden border bg-transparent px-4 py-2 text-base font-bold shadow-sm transition-all duration-300 ease-in-out hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10">
            {status.loading ? "ENVOI..." : "ENVOYER"}
          </span>
          {status.loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-accent h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
            </div>
          )}
        </button>
        {status.notification && (
          <p
            className={`rounded-md px-4 py-2 text-center text-sm font-medium transition-all duration-300 ease-in-out md:text-left ${
              status.notification.type === "success"
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {status.notification.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
