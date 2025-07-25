"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  objet: "",
  message: "",
};

const FIELDS_CONFIG = [
  { name: "name", label: "Nom", type: "text", required: true, minLength: 4 },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "objet", label: "Objet", type: "text", required: true, minLength: 2 },
  { name: "message", label: "Message", type: "textarea", required: true, minLength: 10 },
];

const ContactForm = () => {
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
    
    if (field.required && !trimmedValue) return `${field.label} est requis`;
    if (field.minLength && trimmedValue.length < field.minLength) {
      return `Votre ${field.label.toLowerCase()} doit contenir au moins ${field.minLength} caractères`;
    }
    if (field.type === "email" && trimmedValue && !/\S+@\S+\.\S+/.test(trimmedValue)) {
      return "Veuillez entrer une adresse e-mail valide";
    }
    return "";
  };

  const validateForm = () => {
    const errors = {};
    FIELDS_CONFIG.forEach(field => {
      const value = formData[field.name];
      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} est requis`;
      } else if (field.minLength && value.trim().length < field.minLength) {
        errors[field.name] = `Votre ${field.label.toLowerCase()} doit contenir au moins ${field.minLength} caractères`;
      } else if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        errors[field.name] = "Veuillez entrer une adresse e-mail valide";
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
      toast.error("Veuillez corriger les erreurs avant d'envoyer le formulaire.");
      return;
    }
    
    setStatus({ loading: true });
    setValidationErrors({});
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Message envoyé avec succès!");
        setFormData(INITIAL_FORM_STATE);
        setTouchedFields({});
      } else {
        throw new Error(data.message || "L'envoi du message a échoué.");
      }
    } catch (error) {
      toast.error(error.message || "Une erreur s'est produite.");
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
          <span className="text-sm font-medium text-gray-600">
            {isComplete ? "Formulaire complet!" : "Progression du formulaire"}
          </span>
          <span className="text-sm font-medium text-[#242936]">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ease-out ${
              isComplete 
                ? "bg-green-500" 
                : "bg-gradient-to-r from-[#242936] to-gray-600"
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
        <div className="relative">
          <button
            type="submit"
            disabled={status.loading || progressPercentage < 100}
            className={`mt-5 flex h-15 w-full transform-gpu cursor-pointer items-center justify-center rounded-lg font-bold text-white transition-all duration-300 ${
              progressPercentage === 100 && !status.loading
                ? "bg-[#242936] hover:scale-[1.01] hover:bg-gray-800 hover:shadow-lg"
                : "cursor-not-allowed bg-gray-400"
            } disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
          >
            {status.loading ? (
              <>
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Envoyer le message</span>
                {progressPercentage === 100 && (
                  <span className="ml-2 text-lg">🚀</span>
                )}
              </>
            )}
          </button>

          {progressPercentage < 100 && (
            <p className="mt-2 text-center text-xs text-gray-500">
              Remplissez tous les champs pour activer le bouton d&apos;envoi.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;