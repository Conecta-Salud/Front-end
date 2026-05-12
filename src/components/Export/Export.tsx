import React, { useState, useEffect } from 'react';
// @ts-ignore
import excelIcon from '../../assets/icons/excelIcon.svg';
// @ts-ignore
import pdfIcon from '../../assets/icons/pdfIcon.svg';
// @ts-ignore
import imgIcon from '../../assets/icons/imgIcon.svg';
// @ts-ignore
import cancelarIcon from '../../assets/icons/close2Icon.svg';
import Button from '../Button/Button';

interface ExportProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string) => void;
}

const Export: React.FC<ExportProps> = ({ isOpen, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [isExporting, setIsExporting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsExporting(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true); 
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200); 
  };

  const handleAction = () => {
    setIsExporting(true);
    onExport(selectedFormat);
  };
  if (!isOpen && !isClosing) return null;

  const formats = [
    { id: 'excel', label: 'Excel', icon: excelIcon },
    { id: 'pdf', label: 'PDF', icon: pdfIcon },
    { id: 'image', label: 'Imagen', icon: imgIcon },
  ];

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200
        ${isClosing ? 'opacity-0' : 'opacity-100'}
        /* Evita que este div capture clics si ya se está cerrando */
        ${isClosing ? 'pointer-events-none' : 'pointer-events-auto'}
      `}
    >
      <div 
        className={`
          relative w-[400px] bg-white rounded-[24px] shadow-2xl p-8 
          ${isClosing 
            ? 'animate-out fade-out zoom-out duration-200' 
            : 'animate-in fade-in zoom-in duration-200'}
        `}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-black text-[#1A365D] tracking-tight">
            Selecciona el formato
          </h2>
          <button 
            onClick={handleClose}
            disabled={isExporting} 
            className={`p-1 rounded-full transition-colors ${isExporting ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <img src={cancelarIcon} alt="Cerrar" className="w-8 h-8" />
          </button>
        </div>

        {/* Lista de opciones */}
        <div className={`flex flex-col gap-4 mb-8 transition-opacity duration-300 ${isExporting ? 'opacity-40 pointer-events-none' : ''}`}>
          {formats.map((format) => (
            <label 
              key={format.id}
              className={`
                flex items-center gap-4 p-4 rounded-[15px] border-2 cursor-pointer transition-all
                ${selectedFormat === format.id 
                  ? 'border-[#4FD1C5] bg-[#F0FDFA]' 
                  : 'border-gray-100 hover:border-gray-200'}
              `}
            >
              <input 
                type="radio" 
                name="exportFormat"
                className="w-5 h-5 accent-[#4FD1C5]"
                checked={selectedFormat === format.id}
                onChange={() => setSelectedFormat(format.id)}
              />
              <img src={format.icon} alt={format.label} className="w-8 h-8 object-contain" />
              <span className="text-[18px] font-bold text-gray-700">{format.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            label={isExporting ? "Exportando..." : "Exportar"} 
            tone="blue"
            height="50"
            className={`w-full text-lg uppercase font-black transition-all duration-300 
              ${isExporting ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}`}
            onClick={handleAction}
            disabled={isExporting} 
          />
        </div>
      </div>
    </div>
  );
};

export default Export;