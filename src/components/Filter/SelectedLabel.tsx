interface SelectedLabelProps {
  label: string;
}

export default function SelectedLabel({
  label,
}: SelectedLabelProps) {
    return (
        <span 
            className="flex items-center h-5 rounded-[5px] shadow-sm px-[2px] font-medium text-xs text-white"
            style={{
                background: "var(--gradient-primary-green)",
            }}>
            {label}
        </span>
    );
}