import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Heart, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatsCards from "@/components/dashboard/StatsCards";
import AlertPanels from "@/components/dashboard/AlertPanels";
import ApiControlPanel from "@/components/dashboard/ApiControlPanel";
import PatientTable from "@/components/dashboard/PatientTable";
import AssessmentModal from "@/components/dashboard/AssessmentModal";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { calculateRiskScores, generateAlertLists } from "@/utils/riskCalculation";
import { submitAssessment } from "@/services/api";
import type { PatientsResponse, PatientWithRisk, AssessmentResults, SubmissionResponse } from "@shared/schema";

export default function Dashboard() {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [submissionResults, setSubmissionResults] = useState<SubmissionResponse | null>(null);
  const { toast } = useToast();

  // Fetch all patients data
  const { data: patientsData, isLoading, error, refetch } = useQuery<PatientsResponse>({
    queryKey: ['/api/patients/all'],
  });

  // Calculate risk scores and alerts
  const patientsWithRisk: PatientWithRisk[] = patientsData ? 
    calculateRiskScores(patientsData.data) : [];
  
  const alerts = generateAlertLists(patientsWithRisk);

  // Submit assessment mutation
  const submitMutation = useMutation({
    mutationFn: submitAssessment,
    onSuccess: (results) => {
      setSubmissionResults(results);
      setShowAssessmentModal(true);
      toast({
        title: "Assessment Submitted",
        description: `Score: ${results.results.percentage}% - ${results.results.status}`,
        variant: results.results.status === "PASS" ? "default" : "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  const handleRefreshData = () => {
    refetch();
    toast({
      title: "Data Refreshed",
      description: "Patient data has been updated from the API",
    });
  };

  const handleSubmitAssessment = () => {
    const assessmentData: AssessmentResults = {
      high_risk_patients: alerts.highRisk.map(p => p.patient_id),
      fever_patients: alerts.fever.map(p => p.patient_id),
      data_quality_issues: alerts.dataQuality.map(p => p.patient_id),
    };

    submitMutation.mutate(assessmentData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading patient data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h1>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Failed to load patient data"}
          </p>
          <button 
            onClick={handleRefreshData}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = {
    totalPatients: patientsWithRisk.length,
    highRiskCount: alerts.highRisk.length,
    feverCount: alerts.fever.length,
    dataIssueCount: alerts.dataQuality.length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="text-blue-600 h-8 w-8" />
                <h1 className="text-xl font-semibold text-gray-900">DemoMed Healthcare</h1>
              </div>
              <span className="text-sm text-gray-500 hidden sm:inline">Risk Assessment Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">API Connected</span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <StatsCards stats={stats} />

        {/* Alert System */}
        <AlertPanels alerts={alerts} />

        {/* API Control Panel */}
        <ApiControlPanel 
          onRefreshData={handleRefreshData}
          onSubmitAssessment={handleSubmitAssessment}
          isLoading={isLoading}
          isSubmitting={submitMutation.isPending}
        />

        {/* Patient Data Table */}
        <PatientTable patients={patientsWithRisk} />

        {/* Assessment Results Modal */}
        <AssessmentModal
          isOpen={showAssessmentModal}
          onClose={() => setShowAssessmentModal(false)}
          results={submissionResults}
        />
      </main>
    </div>
  );
}
