"use client";

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
}) => {
  const isTextarea = type === "textarea";
  const hasError = !!error;
  const hasValue = !!value;
  const showValidation = isTouched && hasValue && !isValid && validationMessage;

  const inputClasses = `w-full rounded-lg border bg-slate-800/30 backdrop-blur-sm px-4 py-3.5 text-base text-white placeholder-slate-400 placeholder:text-center lg:placeholder:text-left transition-all duration-300 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : isValid && isTouched
      ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
      : "border-slate-600 hover:border-accent focus:border-accent focus:ring-accent/20"
  }`;

  return (
    <div className={`item-animate flex flex-col gap-2 text-center lg:text-left ${className}`}>
      <label
        htmlFor={name}
        className={`text-sm font-bold tracking-wide ${hasError ? "text-red-400" : "text-slate-300"}`}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="group relative">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            className={`${inputClasses} h-36 resize-none`}
            minLength={minLength}
            required={required}
            placeholder={`Votre ${label.toLowerCase()}...`}
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
            placeholder={`Votre ${label.toLowerCase()}...`}
          />
        )}

        {hasValue && isValid && !hasError && (
          <div className="absolute top-1/2 right-3.5 -translate-y-1/2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <span className="text-xs text-white">✓</span>
            </div>
          </div>
        )}
      </div>

      {hasError && (
        <p className="mt-1 flex items-center text-xs text-red-400">
          <span className="mr-1.5">⚠️</span>
          {error}
        </p>
      )}

      {showValidation && (
        <p className="mt-1 flex items-center text-xs text-orange-400">
          <span className="mr-1.5">⚠️</span>
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
