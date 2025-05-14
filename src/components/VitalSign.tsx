
import React from "react";

interface VitalSignProps {
  label: string;
  value: number | string;
  unit?: string;
  normalRange?: string;
  status?: "normal" | "warning" | "danger";
}

const VitalSign: React.FC<VitalSignProps> = ({
  label,
  value,
  unit = "",
  normalRange,
  status = "normal",
}) => {
  const statusClass = {
    normal: "vital-normal",
    warning: "vital-warning",
    danger: "vital-danger",
  }[status];

  return (
    <div className="flex flex-col space-y-1">
      <div className="text-sm text-space-neutral">{label}</div>
      <div className={`text-lg font-medium ${statusClass}`}>
        {value} {unit}
      </div>
      {normalRange && (
        <div className="text-xs text-space-neutral">[Normal: {normalRange}]</div>
      )}
    </div>
  );
};

export default VitalSign;
