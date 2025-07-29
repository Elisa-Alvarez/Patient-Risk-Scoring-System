import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight, Check, AlertTriangle, Thermometer, AlertCircle } from "lucide-react";
import type { PatientWithRisk } from "@shared/schema";

interface PatientTableProps {
  patients: PatientWithRisk[];
}

export default function PatientTable({ patients }: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered patients
  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const getRiskBadgeColor = (score: number) => {
    if (score >= 4) return "destructive";
    if (score >= 2) return "secondary";
    return "default";
  };

  const getRiskStatusBadge = (patient: PatientWithRisk) => {
    const badges = [];
    
    if (patient.isHighRisk) {
      badges.push(
        <Badge key="high-risk" variant="destructive" className="text-xs">
          <AlertTriangle className="mr-1 h-3 w-3" />
          High Risk
        </Badge>
      );
    } else {
      badges.push(
        <Badge key="low-risk" variant="default" className="bg-green-100 text-green-800 text-xs">
          <Check className="mr-1 h-3 w-3" />
          Low Risk
        </Badge>
      );
    }

    if (patient.hasFever) {
      badges.push(
        <Badge key="fever" className="bg-amber-100 text-amber-800 text-xs">
          <Thermometer className="mr-1 h-3 w-3" />
          Fever
        </Badge>
      );
    }

    if (patient.hasDataQualityIssues) {
      badges.push(
        <Badge key="data-issue" variant="secondary" className="text-xs">
          <AlertCircle className="mr-1 h-3 w-3" />
          Data Issue
        </Badge>
      );
    }

    return badges;
  };

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-gray-900">Patient Risk Assessment Data</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="pageSize" className="text-sm text-gray-600">Show:</label>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Demographics</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Vitals</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Breakdown</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Risk</TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.map((patient) => (
                <TableRow key={patient.patient_id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.patient_id}</div>
                      <div className="text-sm text-gray-500">{patient.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {patient.age ? `${patient.age} years` : 'Unknown age'}, {patient.gender}
                    </div>
                    <div className="text-sm text-gray-500">{patient.visit_date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      BP: {patient.blood_pressure || 'N/A'}
                    </div>
                    <div className={`text-sm ${patient.hasFever ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      Temp: {patient.temperature ? `${patient.temperature}°F` : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Badge 
                        variant={patient.riskScore.bloodPressure >= 3 ? "destructive" : 
                                patient.riskScore.bloodPressure >= 2 ? "secondary" : "default"}
                        className="text-xs"
                      >
                        BP: {patient.riskScore.bloodPressure}
                      </Badge>
                      <Badge 
                        variant={patient.riskScore.temperature >= 1 ? "secondary" : "default"}
                        className="text-xs"
                      >
                        Temp: {patient.riskScore.temperature}
                      </Badge>
                      <Badge 
                        variant={patient.riskScore.age >= 2 ? "secondary" : "default"}
                        className="text-xs"
                      >
                        Age: {patient.riskScore.age}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getRiskBadgeColor(patient.riskScore.total)} 
                      className="text-sm font-semibold px-3 py-1"
                    >
                      {patient.riskScore.total}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {getRiskStatusBadge(patient)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredPatients.length)}</span> of{' '}
                  <span className="font-medium">{filteredPatients.length}</span> patients
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-l-md"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="rounded-none"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-r-md"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}