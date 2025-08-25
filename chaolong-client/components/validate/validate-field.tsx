import React from "react";

interface ValidateFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  title: string;
  placeholder?: string;
  error?: string;
  id?: string;
}

const ValidateField: React.FC<ValidateFieldProps> = ({
  type,
  title,
  placeholder,
  error,
  id,
  ...other
}) => {
  const inputId =
    id ??
    (typeof other.name === "string"
      ? other.name
      : `field-${title.replace(/\s+/g, "-").toLowerCase()}`);

  return (
    <div className="py-2">
      <div className="wf-input">
        <input
          id={inputId}
          className="fancy-input"
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...other}
        />
      </div>

      <p
        id={`${inputId}-error`}
        className={error ? "block pt-2 text-red-600 italic" : "hidden"}
      >
        {error}
      </p>
    </div>
  );
};

export default ValidateField;
