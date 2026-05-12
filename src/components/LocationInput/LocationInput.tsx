import React from 'react';
// @ts-ignore
import pinIcon from '../../assets/icons/pinIcon.svg';
// @ts-ignore
import closeIcon from '../../assets/icons/closeIcon.svg';

interface LocationInputProps {
  text1: string; 
  text2: string; 
  onClear: () => void;
  
  onChangeText1?: (val: string) => void;
  onChangeText2?: (val: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  text1, 
  text2, 
  onClear,
  onChangeText1,
  onChangeText2 
}) => {
  return (
    <div className="flex items-center gap-3 bg-white border-4 border-[#4FD1C5] rounded-full px-4 py-2 shadow-md w-full max-w-md">
      <img src={pinIcon} alt="Pin" className="w-6 h-6 opacity-60" />
      
      <div className="flex flex-1 items-center gap-1 min-w-0">
        {/* INPUT PARA MUNICIPIO */}
        <input
          type="text"
          value={text1}
          placeholder="Municipio"
          onChange={(e) => onChangeText1?.(e.target.value)}
          className="text-[18px] font-black text-black w-full bg-transparent outline-none placeholder:text-gray-300"
        />
        
        <span className="text-gray-400 font-bold">(</span>
        
        {/* INPUT PARA ESTADO */}
        <input
          type="text"
          value={text2}
          placeholder="Estado"
          onChange={(e) => onChangeText2?.(e.target.value)}
          className="text-[18px] font-medium text-gray-500 w-full bg-transparent outline-none placeholder:text-gray-300"
        />
        
        <span className="text-gray-400 font-bold">)</span>
      </div>

      <button 
        onClick={onClear}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0"
      >
        <img src={closeIcon} alt="Limpiar" className="w-7 h-7" />
      </button>
    </div>
  );
};

export default LocationInput;