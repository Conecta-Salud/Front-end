import React from "react";
import eyeCloseIcon from "../../assets/icons/eyeCloseIcon.svg";
import eyeOpenIcon from "../../assets/icons/eyeOpenIcon.svg";
import userIcon from "../../assets/icons/userIcon.svg";

type CustomInputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  type?: "text" | "password" | "email";
  importance?: boolean;
  rightIcon?: string;
  passwordVisibleIcon?: string;
  passwordHiddenIcon?: string;
};

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  name,       
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  type = "text",
  importance = false,
  rightIcon,
  passwordVisibleIcon = eyeCloseIcon,
  passwordHiddenIcon = eyeOpenIcon,
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
        className="w-full h-[61px] rounded-[10px] p-[3px]"
        style={{ background: "var(--gradient-primary-green)" }}
      >
        <div className="relative h-full w-full rounded-[7.5px] bg-white px-2.5 py-2.5 flex flex-col justify-center leading-none">
          <label
            htmlFor={name} 
            className="text-[14px] font-semibold bg-clip-text text-transparent"
            style={{ 
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text" // Necesario para que el texto sea gradiente
            }}
          >
            {label}
            {importance && (
              <span className="ml-1">*</span>
            )}
          </label>

          <input
            id={name}
            name={name}
            placeholder={placeholder}
            type={inputType}
            value={value}
            required={importance}
            readOnly={readOnly} // <-- ESTO ES LO QUE FALTABA
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[20px] leading-none pr-10"
          />

          {type === "password" ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
            >
              <img
                src={iconToShow}
                alt="toggle password visibility"
                className="w-[22px] h-auto max-h-[22px] object-contain"
              />
            </button>
          ) : (
            <img
              src={iconToShow}
              alt="field icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[22px] h-auto max-h-[22px] object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomInputField;