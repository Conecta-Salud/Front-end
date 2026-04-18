import React from "react";
import { Button } from "@heroui/react";

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  color?: "primary" | "secondary" | "danger" | "default";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  textClassName?: string; // <--- ESTA LÍNEA ES LA QUE FALTA
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  color = "primary",
  variant = "solid",
  size = "md",
  isLoading = false,
  isDisabled = false,
  className = "",
  textClassName = "", // <--- Y RECIBIRLA AQUÍ
}) => {
  
  const colorClasses = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-purple-600 text-white",
    danger: "bg-red-600 text-white",
    default: "bg-gray-200 text-black",
  };

  const variantClasses = {
    solid: "",
    outline: "border-2 bg-transparent",
    ghost: "bg-transparent hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled || isLoading}
      className={`
        inline-flex items-center justify-center rounded-xl font-semibold transition-all shadow-sm
        ${colorClasses[color]} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
      `}
    >
      {/* Aplicamos la clase de texto aquí */}
      <span className={textClassName}>
        {isLoading ? "Cargando..." : title}
      </span>
    </Button>
  );
};

export default CustomButton;