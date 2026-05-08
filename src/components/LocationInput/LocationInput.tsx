import React from 'react';
// @ts-ignore
import pinIcon from '../../assets/icons/pinIcon.svg';
// @ts-ignore
import cancelarIcon from '../../assets/icons/cancelIcon.svg';

interface LocationInputProps {
  text1: string;
  text2?: string;
  onClear?: () => void;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  text1, 
  text2, 
  onClear,
  className = "" 
}) => {
  return (
    <div 
      className={`
        flex items-center w-full relative
        bg-[#F1F1F1] transition-all shadow-md
        ${className}
      `}
      style={{
        height: '60px', 
        borderRadius: '15px', 
        border: '6px solid var(--color-green-start)', 
        fontFamily: 'var(--font-primary)',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Icono PIN: Separación exacta de 10px */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '10px', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <img 
          src={pinIcon.src || pinIcon} 
          alt="Ubicación" 
          className="h-[28px] w-auto object-contain" 
        />
      </div>

      {/* Contenedor de Texto */}
      <div className="w-full flex items-baseline justify-start" style={{ paddingLeft: '50px', paddingRight: '60px' }}>
        <span 
          className="text-black whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontSize: '24px' }}
        >
          <strong style={{ fontWeight: 'var(--font-weight-bold)' }}>{text1}</strong>
          <span className="ml-2 text-[#4A4A4A]" style={{ fontWeight: 'var(--font-weight-regular)' }}>
            ({text2})
          </span>
        </span>
      </div>

      {/* Botón CANCELAR: Separación exacta de 10px */}
      <button 
        onClick={onClear}
        className="hover:opacity-80 transition-opacity flex items-center justify-center p-0 border-none bg-transparent"
        style={{ 
          position: 'absolute', 
          right: '10px',
          cursor: 'pointer'
        }}
      >
        <img 
          src={cancelarIcon.src || cancelarIcon} 
          alt="Limpiar" 
          className="h-[42px] w-[42px] object-contain"
        />
      </button>
    </div>
  );
};

export default LocationInput; 