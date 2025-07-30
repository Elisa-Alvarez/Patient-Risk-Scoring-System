import { type Patient, type PatientsResponse, type AssessmentResults, type SubmissionResponse } from "@shared/schema";

export interface IStorage {
  // Cache for patient data
  getCachedPatients(): Promise<PatientsResponse | undefined>;
  setCachedPatients(data: PatientsResponse): Promise<void>;
  
  // Assessment results storage
  getAssessmentResults(): Promise<AssessmentResults | undefined>;
  setAssessmentResults(results: AssessmentResults): Promise<void>;
  
  // Submission history
  getSubmissionHistory(): Promise<SubmissionResponse[]>;
  addSubmissionResult(result: SubmissionResponse): Promise<void>;
}

export class MemStorage implements IStorage {
  private cachedPatients: PatientsResponse | undefined;
  private assessmentResults: AssessmentResults | undefined;
  private submissionHistory: SubmissionResponse[] = [];

  async getCachedPatients(): Promise<PatientsResponse | undefined> {
    return this.cachedPatients;
  }

  async setCachedPatients(data: PatientsResponse): Promise<void> {
    this.cachedPatients = data;
  }

  async getAssessmentResults(): Promise<AssessmentResults | undefined> {
    return this.assessmentResults;
  }

  async setAssessmentResults(results: AssessmentResults): Promise<void> {
    this.assessmentResults = results;
  }

  async getSubmissionHistory(): Promise<SubmissionResponse[]> {
    return this.submissionHistory;
  }

  async addSubmissionResult(result: SubmissionResponse): Promise<void> {
    this.submissionHistory.push(result);
  }
}

export const storage = new MemStorage();
