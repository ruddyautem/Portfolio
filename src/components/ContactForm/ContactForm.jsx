"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations, useLocale } from "next-intl";
import InputField from "./InputField";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  objet: "",
  message: "",
};

// Kept perfectly outside to prevent re-render loops!
const FIELDS_CONFIG = [
  { name: "name", type: "text", required: true, minLength: 4 },
  { name: "email", type: "email", required: true },
  { name: "objet", type: "text", required: true, minLength: 2 },
  { name: "message", type: "textarea", required: true, minLength: 10 },
];

const ContactForm = () => {
  const t = useTranslations("contactForm");
  const locale = useLocale();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ loading: false });
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trimStart() }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    setTouchedFields(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isFieldValid = (fieldName, value) => {
    const field = FIELDS_CONFIG.find(f => f.name === fieldName);
    const trimmedValue = value.trim();
    
    if (field.required && !trimmedValue) return false;
    if (field.minLength && trimmedValue.length < field.minLength) return false;
    if (field.type === "email" && trimmedValue && !/\S+@\S+\.\S+/.test(trimmedValue)) return false;
    
    return true;
  };

  const getFieldValidationMessage = (fieldName, value) => {
    const field = FIELDS_CONFIG.find(f => f.name === fieldName);
    const trimmedValue = value.trim();
    const translatedLabel = t(`fields.${field.name}`);
    
    if (field.required && !trimmedValue) {
      return t("validation.required", { label: translatedLabel });
    }
    if (field.minLength && trimmedValue.length < field.minLength) {
      return t("validation.minLength", { label: translatedLabel.toLowerCase(), min: field.minLength });
    }
    if (field.type === "email" && trimmedValue && !/\S+@\S+\.\S+/.test(trimmedValue)) {
      return t("validation.emailInvalid");
    }
    return "";
  };

  const validateForm = () => {
    const errors = {};
    FIELDS_CONFIG.forEach(field => {
      const value = formData[field.name];
      const translatedLabel = t(`fields.${field.name}`);

      if (field.required && !value.trim()) {
        errors[field.name] = t("validation.required", { label: translatedLabel });
      } else if (field.minLength && value.trim().length < field.minLength) {
        errors[field.name] = t("validation.minLength", { label: translatedLabel.toLowerCase(), min: field.minLength });
      } else if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        errors[field.name] = t("validation.emailInvalid");
      }
    });
    return errors;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTouchedFields(Object.fromEntries(FIELDS_CONFIG.map(field => [field.name, true])));
      toast.error(t("validation.formError"));
      return;
    }
    
    setStatus({ loading: true });
    setValidationErrors({});
    
    try {
      // 🔥 FIX: We dynamically use the locale variable in the URL so it perfectly matches the App Router!
      const response = await fetch(`/${locale}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });
      
      // Handle the case where the server returns an HTML error page
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(t("validation.genericError"));
      }

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setFormData(INITIAL_FORM_STATE);
        setTouchedFields({});
      } else {
        throw new Error(data.message || t("validation.genericError"));
      }
    } catch (error) {
      toast.error(error.message || t("validation.genericError"));
    } finally {
      setStatus({ loading: false });
    }
  };

  const validFields = FIELDS_CONFIG.filter(field => 
    isFieldValid(field.name, formData[field.name])
  ).length;
  const progressPercentage = (validFields / FIELDS_CONFIG.length) * 100;
  const isComplete = progressPercentage === 100;

  return (
    <div className="relative">
      {/* Form Progress */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300 mx-auto lg:mx-0">
            {isComplete ? t("ui.progressComplete") : t("ui.progressIncomplete")}
          </span>
          <span className="text-accent text-sm font-medium">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-700/50">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ease-out ${
              isComplete 
                ? "bg-green-500" 
                : "bg-accent"
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* Name and Email Row */}
        <div className="flex flex-col gap-7 sm:flex-row">
          {FIELDS_CONFIG.slice(0, 2).map((field) => (
            <InputField
              key={field.name}
              {...field}
              label={t(`fields.${field.name}`)}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              className="w-full"
              error={validationErrors[field.name]}
              isValid={isFieldValid(field.name, formData[field.name])}
              isTouched={touchedFields[field.name]}
              validationMessage={getFieldValidationMessage(field.name, formData[field.name])}
            />
          ))}
        </div>

        {/* Subject and Message */}
        {FIELDS_CONFIG.slice(2).map((field) => (
          <InputField
            key={field.name}
            {...field}
            label={t(`fields.${field.name}`)}
            value={formData[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            className="w-full"
            error={validationErrors[field.name]}
            isValid={isFieldValid(field.name, formData[field.name])}
            isTouched={touchedFields[field.name]}
            validationMessage={getFieldValidationMessage(field.name, formData[field.name])}
          />
        ))}

        {/* Submit Button */}
        <div className="relative text-center lg:text-left">
          <button
            type="submit"
            disabled={status.loading || progressPercentage < 100}
            className={`bg-accent mt-5 flex h-15 w-full transform-gpu cursor-pointer items-center justify-center rounded-lg font-bold text-slate-900 transition-all duration-300 ${
              progressPercentage === 100 && !status.loading
                ? "hover:scale-[1.01] hover:shadow-glow"
                : "cursor-not-allowed opacity-50"
            } disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
          >
            {status.loading ? (
              <>
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></div>
                <span>{t("ui.sending")}</span>
              </>
            ) : (
              <>
                <span>{t("ui.sendBtn")}</span>
                {progressPercentage === 100 && (
                  <span className="ml-2 text-lg">🚀</span>
                )}
              </>
            )}
          </button>

          {progressPercentage < 100 && (
            <p className="mt-2 text-center text-xs text-slate-400">
              {t("ui.fillAllFields")}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;