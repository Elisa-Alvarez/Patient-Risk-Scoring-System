import { apiRequest } from "@/lib/queryClient";
import type { AssessmentResults, SubmissionResponse } from "@shared/schema";

export async function submitAssessment(results: AssessmentResults): Promise<SubmissionResponse> {
  const response = await apiRequest("POST", "/api/submit-assessment", results);
  return await response.json();
}

export async function fetchPatients(page: number = 1, limit: number = 10) {
  const response = await apiRequest("GET", `/api/patients?page=${page}&limit=${limit}`);
  return await response.json();
}

export async function fetchAllPatients() {
  const response = await apiRequest("GET", "/api/patients/all");
  return await response.json();
}
