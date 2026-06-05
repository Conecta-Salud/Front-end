import React from "react";

import eyeCloseIcon from "../../../assets/icons/eyeCloseIcon.svg";
import eyeOpenIcon from "../../../assets/icons/eyeOpenIcon.svg";
import userIcon from "../../../assets/icons/userIcon.svg";

type CustomInputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email";
  importance?: boolean;
  rightIcon?: string;
  passwordVisibleIcon?: string;
  passwordHiddenIcon?: string;
  autoComplete?: string;
  disabled?: boolean;
  maxLength?: number;
  showIcon?: boolean;
};

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  importance = false,
  rightIcon,
  passwordVisibleIcon = eyeCloseIcon,
  passwordHiddenIcon = eyeOpenIcon,
  autoComplete,
  disabled = false,
  maxLength,
  showIcon = true,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const iconToShow =
    type === "password"
      ? showPassword
        ? passwordVisibleIcon
        : passwordHiddenIcon
      : rightIcon || userIcon;

  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-[61px] w-full rounded-[10px] px-0.75 py-0.75"
        style={{ background: "var(--gradient-primary-green)" }}
      >
        <div className="relative flex h-full w-full flex-col justify-center rounded-[7.5px] bg-white px-2.5 py-2.5 leading-none">
          <label
            htmlFor={name}
            className="text-[14px] font-semibold"
            style={{ color: "var(--color-blue)" }}
          >
            {label}
            {importance && (
              <span
                className="text-[14px] font-semibold"
                style={{ color: "var(--color-blue)" }}
              >
                *
              </span>
            )}
          </label>

          <input
            id={name}
            name={name}
            placeholder={placeholder}
            type={inputType}
            value={value}
            required={importance}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
            onChange={(event) => onChange?.(event.target.value)}
            className={[
              "w-full border-none bg-transparent text-[20px] leading-none outline-none disabled:cursor-not-allowed disabled:opacity-60",
              showIcon ? "pr-10" : "pr-0",
            ].join(" ")}
          />

          {showIcon &&
            (type === "password" ? (
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={disabled}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src={iconToShow}
                  alt=""
                  aria-hidden="true"
                  className="h-auto max-h-[22px] w-[22px] object-contain"
                />
              </button>
            ) : (
              <img
                src={iconToShow}
                alt=""
                aria-hidden="true"
                className="absolute right-3 top-1/2 h-auto max-h-[22px] w-[22px] -translate-y-1/2 object-contain"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomInputField;
