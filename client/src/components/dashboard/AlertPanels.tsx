import { AlertTriangle, Thermometer, AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PatientWithRisk } from "@shared/schema";

interface AlertPanelsProps {
  alerts: {
    highRisk: PatientWithRisk[];
    fever: PatientWithRisk[];
    dataQuality: PatientWithRisk[];
  };
}

export default function AlertPanels({ alerts }: AlertPanelsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* High Risk Patients Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-red-500 h-5 w-5" />
              <CardTitle className="text-lg text-red-800">High Risk Patients</CardTitle>
            </div>
            <Badge variant="destructive" className="bg-red-100 text-red-800">
              {alerts.highRisk.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.highRisk.slice(0, 3).map((patient) => (
              <div key={patient.patient_id} className="flex justify-between items-center text-sm">
                <span className="font-medium text-red-700">{patient.patient_id}</span>
                <span className="text-red-600">Risk Score: {patient.riskScore.total}</span>
              </div>
            ))}
            {alerts.highRisk.length > 3 && (
              <Button variant="link" className="text-red-600 hover:text-red-800 p-0 h-auto font-medium text-sm">
                View All High Risk Patients <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fever Patients Alert */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="text-amber-500 h-5 w-5" />
              <CardTitle className="text-lg text-amber-800">Fever Patients</CardTitle>
            </div>
            <Badge className="bg-amber-100 text-amber-800">
              {alerts.fever.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.fever.slice(0, 3).map((patient) => (
              <div key={patient.patient_id} className="flex justify-between items-center text-sm">
                <span className="font-medium text-amber-700">{patient.patient_id}</span>
                <span className="text-amber-600">{patient.temperature}°F</span>
              </div>
            ))}
            {alerts.fever.length > 3 && (
              <Button variant="link" className="text-amber-600 hover:text-amber-800 p-0 h-auto font-medium text-sm">
                View All Fever Cases <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Issues */}
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-gray-500 h-5 w-5" />
              <CardTitle className="text-lg text-gray-800">Data Quality Issues</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
              {alerts.dataQuality.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.dataQuality.slice(0, 3).map((patient) => (
              <div key={patient.patient_id} className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-700">{patient.patient_id}</span>
                <span className="text-gray-600">
                  {!patient.blood_pressure || patient.blood_pressure === "N/A" ? "Missing BP" :
                   patient.temperature === null ? "Missing Temp" :
                   patient.age === null ? "Missing Age" : "Data Issue"}
                </span>
              </div>
            ))}
            {alerts.dataQuality.length > 3 && (
              <Button variant="link" className="text-gray-600 hover:text-gray-800 p-0 h-auto font-medium text-sm">
                View All Issues <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}