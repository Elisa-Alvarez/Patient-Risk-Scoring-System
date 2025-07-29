import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export default function LoadingSpinner({ message = "Loading...", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      <div>
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-xs text-gray-500">This may take a moment</p>
      </div>
    </div>
  );
}