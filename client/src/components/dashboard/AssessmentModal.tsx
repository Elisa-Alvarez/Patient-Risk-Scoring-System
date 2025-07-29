import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import type { SubmissionResponse } from "@shared/schema";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: SubmissionResponse | null;
}

export default function AssessmentModal({ isOpen, onClose, results }: AssessmentModalProps) {
  if (!results) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Assessment Results
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Success indicator */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="text-green-600 h-6 w-6" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Submission Successful</h4>
            <p className="text-sm text-gray-600 mt-2">Your assessment has been submitted and scored.</p>
          </div>
          
          {/* Overall score */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Score</span>
              <span className="text-2xl font-bold text-blue-600">{results.results.percentage}%</span>
            </div>
            <Progress value={results.results.percentage} className="h-2" />
            <div className="mt-2 text-center">
              <Badge variant={results.results.status === "PASS" ? "default" : "destructive"}>
                {results.results.status}
              </Badge>
            </div>
          </div>
          
          {/* Breakdown scores */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-xs text-green-600 font-medium">High Risk</div>
              <div className="text-lg font-semibold text-green-800">
                {results.results.breakdown.high_risk.score}/{results.results.breakdown.high_risk.max}
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3">
              <div className="text-xs text-amber-600 font-medium">Fever</div>
              <div className="text-lg font-semibold text-amber-800">
                {results.results.breakdown.fever.score}/{results.results.breakdown.fever.max}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-blue-600 font-medium">Data Quality</div>
              <div className="text-lg font-semibold text-blue-800">
                {results.results.breakdown.data_quality.score}/{results.results.breakdown.data_quality.max}
              </div>
            </div>
          </div>

          {/* Feedback */}
          {results.results.feedback && (
            <div className="space-y-3">
              {results.results.feedback.strengths.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-green-700 mb-2">Strengths:</h5>
                  <ul className="text-sm text-green-600 space-y-1">
                    {results.results.feedback.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.results.feedback.issues.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-amber-700 mb-2">Areas for Improvement:</h5>
                  <ul className="text-sm text-amber-600 space-y-1">
                    {results.results.feedback.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {results.results.remaining_attempts} attempts remaining
            </span>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}