
import React from "react";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  risk: "Critical" | "High" | "Medium" | "Low";
  className?: string;
  animate?: boolean;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, className, animate = false }) => {
  const badgeClass = {
    Critical: "risk-badge-critical",
    High: "risk-badge-high",
    Medium: "risk-badge-medium",
    Low: "risk-badge-low",
  }[risk];

  return (
    <span className={cn(badgeClass, animate && risk === "Critical" && "animate-pulse-alert", className)}>
      {risk}
    </span>
  );
};

export default RiskBadge;
