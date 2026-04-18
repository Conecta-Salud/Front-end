import React from "react";
//import { User, Mail, Lock } from "lucide-react-native";
import { Label, Input, TextField } from "@heroui/react";

type CustomInputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "password" | "email";
  //iconType?: "user" | "mail" | "lock";
  importance?: boolean;
};

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  importance = false,
  //iconType = "user",
}) => {
  /*const renderIcon = () => {
    switch (iconType) {
      case "mail":
        return Mail;
      case "lock":
        return Lock;
      case "user":
      default:
        return User;
    }
  };*/

  //const SelectedIcon = renderIcon();

  return (
    <TextField
      isRequired={importance}
      name={name}
      value={value}
      onChange={(value: string) => onChange?.(value)}
      className="gap-2 rounded-xl border border-border/60 bgsurface p-4 shadow-sm"
    >
      <Label className="text-sm font-semibold text-default-700">{label}</Label>

      <Input
        placeholder={placeholder}
        type={type}
        className="rounded-lg border border-border/60 bgsurface px-3 py-2"
      />
    </TextField>
  );
};

export default CustomInputField;
