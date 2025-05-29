"use client";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
  autoComplete = "off",
  className = "",
  minLength,
}) => {
  const isTextarea = type === "textarea"; // Check if type is textarea
  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div
      className={`flex flex-col gap-2 text-center md:text-left ${className}`}
    >
      <label
        htmlFor={name}
        className="text-base font-medium tracking-wide uppercase"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="group relative overflow-hidden rounded-md">
        <div className="bg-accent absolute left-0 h-full w-0.5 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100" />
        <InputComponent
          id={name}
          name={name}
          type={!isTextarea ? type : undefined}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`w-full rounded-md border border-transparent bg-gray-400/5 px-4 py-3 text-center transition-colors duration-200 hover:bg-gray-400/10 focus:bg-gray-400/10 focus:outline-none md:text-left ${
            isTextarea ? "h-48 resize-none" : ""
          }`}
          minLength={minLength}
          required={required}
          placeholder={`Votre ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
};

export default InputField;
