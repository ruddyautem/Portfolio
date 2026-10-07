'use client';
import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

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
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  required,
  autoComplete = 'off',
  className = '',
  minLength,
  error,
  isValid = false,
  isTouched = false,
  validationMessage = '',
}: InputFieldProps) => {
  const t = useTranslations('contactForm.ui');

  const isTextarea = type === 'textarea';
  const hasError = !!error;
  const hasValue = typeof value === 'string' ? value.length > 0 : !!value;
  const showValidation = isTouched && hasValue && !isValid && validationMessage;

  const placeholderText = t('placeholder', { label: label.toLowerCase() });

  const inputClasses = `w-full rounded-[10px] border bg-transparent pl-3.5 sm:pl-4 pr-10 sm:pr-11 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-400 placeholder:text-center xl:placeholder:text-left transition-[color,border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20'
      : isValid && hasValue
        ? 'border-emerald-500/60 focus:border-emerald-400 focus:ring-emerald-500/20'
        : 'border-white/8 hover:border-white/14 focus:border-accent focus:ring-accent/20'
  }`;

  return (
    <div className={`flex flex-col gap-1.5 text-center xl:text-left ${className}`}>
      <div className="flex items-center justify-center px-0.5 xl:justify-between">
        <label
          htmlFor={name}
          className={`font-mono text-xs font-semibold tracking-wide sm:text-sm ${
            hasError ? 'text-red-400' : 'text-slate-300'
          }`}
        >
          {label} {required && <span className="text-accent">*</span>}
        </label>
        {minLength && isTextarea && (
          <span className="hidden font-mono text-[11px] text-slate-500 sm:inline-block">
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
            className={`${inputClasses} h-32 min-h-32 resize-y sm:h-36 sm:min-h-36`}
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
            className={`pointer-events-none absolute right-3.5 flex items-center justify-center sm:right-4 ${
              isTextarea ? 'top-3.5 sm:top-4' : 'top-1/2 -translate-y-1/2'
            }`}
          >
            <CheckCircle2 className="h-4 w-4 animate-in text-emerald-400 duration-200 zoom-in-75 fade-in" />
          </div>
        )}
      </div>

      {hasError && (
        <p className="mt-0.5 flex animate-in items-center justify-center gap-1.5 text-xs text-red-400 duration-200 fade-in xl:justify-start">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {showValidation && (
        <p className="mt-0.5 flex animate-in items-center justify-center gap-1.5 text-xs text-amber-400 duration-200 fade-in xl:justify-start">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>{validationMessage}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
