import React, { useRef } from "react";
import CustomButton from "../Button/Button";

type ImportButtonProps = {
  onFileSelect?: (file: File) => void;
  accept?: string;
};

const ImportButton: React.FC<ImportButtonProps> = ({
  onFileSelect,
  accept = "*",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log("Archivo seleccionado:", file);
      (window as any).selectedFile = file;
      console.log("Puedes acceder en consola con: selectedFile");
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <>
      <CustomButton label="Importar" tone="blue" onClick={handleClick} />

      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx"
        onChange={handleChange}
        hidden
      />
    </>
  );
};

export default ImportButton;
