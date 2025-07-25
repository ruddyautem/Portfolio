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
  validationMessage = ""
}) => {
  const isTextarea = type === "textarea";
  const hasError = !!error;
  const hasValue = !!value;
  const showValidationError = isTouched && hasValue && !isValid && validationMessage;

  return (
    <div className={`flex flex-col gap-2 text-left item-animate ${className}`}>
      <label htmlFor={name} className={`text-sm font-bold tracking-wide ${hasError ? 'text-red-600' : 'text-[#242936]'}`}>
        {label} {required && <span className="text-[#DC2626]">*</span>}
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
            className={`h-36 w-full resize-none rounded-lg border-2 bg-white px-4 py-3.5 text-base text-[#242936] transition-all duration-300 focus:outline-none ${
              hasError 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 hover:border-[#242936] focus:border-[#242936] focus:ring-2 focus:ring-[#242936]/20'
            } hover:shadow-md focus:shadow-md`}
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
            className={`w-full rounded-lg border-2 bg-white px-4 py-3.5 text-base text-[#242936] transition-all duration-300 focus:outline-none ${
              hasError 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 hover:border-[#242936] focus:border-[#242936] focus:ring-2 focus:ring-[#242936]/20'
            } hover:shadow-md focus:shadow-md`}
            minLength={minLength}
            required={required}
            placeholder={`Votre ${label.toLowerCase()}...`}
          />
        )}
        
        {/* Success checkmark */}
        {hasValue && isValid && !hasError && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 transform">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <span className="text-xs text-white">✓</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Error messages */}
      {hasError && (
        <p className="mt-1 flex items-center text-xs text-red-600">
          <span className="mr-1.5">⚠️</span>
          {error}
        </p>
      )}
      
      {showValidationError && (
        <p className="mt-1 flex items-center text-xs text-orange-600">
          <span className="mr-1.5">⚠️</span>
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;