import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const StatusBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-danger flex items-center justify-center">
          <AlertTriangle className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-danger">1</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-warning flex items-center justify-center">
          <Clock className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-warning">3</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-fresh flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-fresh">1</span>
      </div>
    </div>
  );
};

export default StatusBar;