import { RefreshCw, Send, Database, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ApiControlPanelProps {
  onRefreshData: () => void;
  onSubmitAssessment: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
}

export default function ApiControlPanel({ 
  onRefreshData, 
  onSubmitAssessment, 
  isLoading, 
  isSubmitting 
}: ApiControlPanelProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="border-b border-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-gray-900">API Control Panel</CardTitle>
          <div className="flex space-x-3">
            <Button 
              onClick={onRefreshData}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Button 
              onClick={onSubmitAssessment}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Assessment
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Database className="text-gray-500 h-5 w-5" />
            <div>
              <p className="text-sm font-medium text-gray-900">API Status</p>
              <p className="text-sm text-green-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="text-gray-500 h-5 w-5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Last Sync</p>
              <p className="text-sm text-gray-600">Just now</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-gray-500 h-5 w-5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Processing</p>
              <p className="text-sm text-gray-600">
                {isLoading || isSubmitting ? 'In Progress' : 'Complete'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}