"use client";
import { useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  minLength?: number;
  error?: string | null;
  isValid?: boolean;
  isTouched?: boolean;
  validationMessage?: string;
}

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  required,
  autoComplete = "off",
  className = "",
  minLength,
  error,
  isValid = false,
  isTouched = false,
  validationMessage = "",
}: InputFieldProps) => {
  const t = useTranslations("contactForm.ui");

  const isTextarea = type === "textarea";
  const hasError = !!error;
  const hasValue = typeof value === 'string' ? value.length > 0 : !!value;
  const showValidation = isTouched && hasValue && !isValid && validationMessage;

  const placeholderText = t("placeholder", { label: label.toLowerCase() });

  const inputClasses = `w-full rounded-xl border bg-slate-800/35 backdrop-blur-md pl-3.5 sm:pl-4 pr-10 sm:pr-11 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 placeholder:text-center xl:placeholder:text-left transition-[color,background-color,border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 focus:bg-slate-800/55 ${
    hasError
      ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20"
      : isValid && hasValue
      ? "border-emerald-500/60 focus:border-emerald-400 focus:ring-emerald-500/20"
      : "border-slate-700/60 hover:border-slate-500/80 focus:border-accent focus:ring-accent/20"
  }`;

  return (
    <div className={`flex flex-col gap-1.5 text-center xl:text-left ${className}`}>
      <div className="flex items-center justify-center xl:justify-between px-0.5">
        <label
          htmlFor={name}
          className={`font-mono text-xs sm:text-sm font-semibold tracking-wide ${
            hasError ? "text-red-400" : "text-slate-300"
          }`}
        >
          {label} {required && <span className="text-accent">*</span>}
        </label>
        {minLength && isTextarea && (
          <span className="hidden sm:inline-block font-mono text-[11px] text-slate-500">
            {typeof value === 'string' ? value.length : 0} / {minLength} min
          </span>
        )}
      </div>

      <div className="group relative">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            className={`${inputClasses} h-32 sm:h-36 min-h-32 sm:min-h-36 resize-y`}
            minLength={minLength}
            required={required}
            placeholder={placeholderText}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            className={inputClasses}
            minLength={minLength}
            required={required}
            placeholder={placeholderText}
          />
        )}

        {hasValue && isValid && !hasError && (
          <div
            className={`pointer-events-none absolute right-3.5 sm:right-4 flex items-center justify-center ${
              isTextarea ? "top-3.5 sm:top-4" : "top-1/2 -translate-y-1/2"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 animate-in fade-in zoom-in-75 duration-200" />
          </div>
        )}
      </div>

      {hasError && (
        <p className="mt-0.5 flex items-center justify-center xl:justify-start gap-1.5 text-xs text-red-400 animate-in fade-in duration-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {showValidation && (
        <p className="mt-0.5 flex items-center justify-center xl:justify-start gap-1.5 text-xs text-amber-400 animate-in fade-in duration-200">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>{validationMessage}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
