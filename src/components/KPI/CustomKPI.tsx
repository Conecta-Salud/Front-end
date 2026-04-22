import React from 'react';

const kpiColors = {
  green: "linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)",
  coral: "#FC6767", // Coral sólido exacto de los botones danger
};

interface CustomKPIProps {
  title: string;
  value: string | number;
  variant?: 'green' | 'coral';
  className?: string;
}

const CustomKPI: React.FC<CustomKPIProps> = ({ 
  title, 
  value, 
  variant = 'green', 
  className = "" 
}) => {
  return (
    <div 
      className={`
        flex flex-col items-center justify-center 
        !p-10 !rounded-[40px] shadow-lg !text-white text-center
        /* Forzamos dimensiones compactas */
        !w-[300px] !h-[200px]
        ${className}
      `}
      style={{
        background: variant === 'coral' ? kpiColors.coral : kpiColors.green,
        fontFamily: "'Fredoka', sans-serif"
      }}
    >
      {/* Contenedor de texto con ancho máximo para que no se extienda */}
      <div className="max-w-[180px] !mb-2">
        <p className="text-lg font-medium leading-tight opacity-95">
          {title}
        </p>
      </div>
      
      <p className="text-6xl font-bold tracking-tighter">
        {value}
      </p>
    </div>
  );
};

export default CustomKPI;


