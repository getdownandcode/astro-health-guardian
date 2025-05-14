
import React from "react";
import { AlertCircle } from "lucide-react";

interface AnomalyAlertProps {
  astronautName: string;
  anomalyScore: number;
  issue: string;
}

const AnomalyAlert: React.FC<AnomalyAlertProps> = ({
  astronautName,
  anomalyScore,
  issue,
}) => {
  return (
    <div className="bg-risk-critical/10 border border-risk-critical/20 rounded-lg p-4 flex items-center space-x-3 animate-pulse-alert">
      <AlertCircle className="text-risk-critical h-6 w-6" />
      <div>
        <p className="font-medium text-risk-critical">
          Anomaly Detected for {astronautName}
        </p>
        <p className="text-sm text-foreground/80">
          {issue}. Anomaly Score: {anomalyScore.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AnomalyAlert;
