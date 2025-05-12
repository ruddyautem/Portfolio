"use client";

import { useEffect, useState } from "react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const fieldsConfig = [
    { name: "name", label: "Nom", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "objet", label: "objet", type: "text", required: true },
    { name: "message", label: "Message", type: "textarea" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {};
    fieldsConfig.forEach((field) => {
      formData[field.name] = e.target[field.name].value;
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseJson = await response.json();

      if (response.ok) {
        console.log("Message sent success", responseJson.message);
        setNotification(responseJson.message);
        resetForm(e);
      } else {
        console.error("Error sending message", responseJson.message);
        setNotification(responseJson.message);
      }
    } catch (error) {
      console.error("Network or server error", error);
      setNotification("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false); // Always re-enable the button
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const resetForm = (e) => {
    fieldsConfig.forEach((field) => {
      e.target[field.name].value = "";
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name and Email */}
      <div className='flex flex-col gap-4 m-4 mt-0 sm:flex-row'>
        {fieldsConfig.slice(0, 2).map((field) => (
          <InputField
            key={field.name}
            {...field}
            autoComplete='off'
            className={`flex flex-col gap-2 w-full 2xl:w-80`}
          />
        ))}
      </div>

      {/* Objet */}
      <div className='flex flex-col gap-4 m-4 sm:flex-row'>
        <InputField
          {...fieldsConfig[2]}
          autoComplete='off'
          className='w-full'
        />
      </div>

      {/* Message */}
      <div className='flex flex-col gap-4 m-4 sm:flex-row'>
        <InputField
          {...fieldsConfig[3]}
          autoComplete='off'
          className='w-full'
        />
      </div>

      <div className='flex items-center'>
        <button
          type='submit'
          disabled={loading}
          className='px-2 py-1 w-24 h-9 text-base m-4 font-bold transition-all duration-300 ease-in-out active:scale-90 border border-accent shadow disabled:bg-gray-800 disabled:opacity-50'
        >
          {loading ? "ENVOI..." : "ENVOYER"}
        </button>
        {notification && (
          <p className='px-2 text-sm xl:text-base mx-2 my-2 font-bold transition-all duration-300 ease-in-out'>
            {notification}
          </p>
        )}
      </div>
    </form>
  );
};

const InputField = ({
  label,
  type,
  name,
  required,
  autoComplete,
  className,
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label htmlFor={name} className={`text-base uppercase`}>
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        autoComplete={autoComplete}
        onChange={(e) => (e.target.value = e.target.value.trimStart())}
        className='w-full px-2 py-1 bg-gray-400 border-none bg-opacity-5 h-48 focus:outline-accent focus:outline-1 focus:outline-none resize-none'
        minLength={10}
        required={required}
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        onChange={(e) => (e.target.value = e.target.value.trimStart())}
        className='w-full px-2 py-1 bg-gray-400 border-none bg-opacity-5 focus:outline-accent focus:outline-1 focus:outline-none'
        minLength={2}
        required={required}
      />
    )}
  </div>
);

export default ContactForm;
