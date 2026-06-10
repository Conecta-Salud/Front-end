type SelectedLabelProps = Readonly<{
  label: string;
}>;

export default function SelectedLabel({
  label,
}: SelectedLabelProps) {
    return (
        <span 
            className="flex items-center h-5 rounded-[5px] shadow-sm p-[7px] font-medium text-xs text-white"
            style={{
                background: "var(--gradient-primary-blue)",
            }}>
            {label}
        </span>
    );
}
