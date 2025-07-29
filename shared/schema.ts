import { z } from "zod";

// The API has inconsistent data formats, need to handle various types
export const patientSchema = z.object({
  patient_id: z.string(),
  name: z.string(),
  age: z.union([z.number(), z.string(), z.null(), z.undefined()]).transform((val) => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }).nullable(),
  gender: z.string().default("Unknown"),
  blood_pressure: z.union([z.string(), z.null(), z.undefined()]).transform((val) => {
    if (val === null || val === undefined || val === "") return null;
    return String(val);
  }).nullable(),
  temperature: z.union([z.number(), z.string(), z.null(), z.undefined()]).transform((val) => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      // Handle string temperature values like "TEMP_ERROR", "invalid", etc.
      if (val.toLowerCase().includes("error") || 
          val.toLowerCase().includes("invalid") || 
          val.toLowerCase().includes("n/a")) {
        return null;
      }
      const parsed = parseFloat(val);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }).nullable(),
  visit_date: z.string().default("Unknown"),
  diagnosis: z.string().default("Unknown"),
  medications: z.string().default("Unknown"),
});

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export const patientsResponseSchema = z.object({
  data: z.array(patientSchema),
  pagination: paginationSchema,
  metadata: z.object({
    timestamp: z.string(),
    version: z.string(),
    requestId: z.string(),
  }),
});

// Risk assessment schemas
export const riskScoreSchema = z.object({
  bloodPressure: z.number().min(0).max(4),
  temperature: z.number().min(0).max(2),
  age: z.number().min(0).max(2),
  total: z.number().min(0).max(8),
});

export const patientWithRiskSchema = patientSchema.extend({
  riskScore: riskScoreSchema,
  hasDataQualityIssues: z.boolean(),
  hasFever: z.boolean(),
  isHighRisk: z.boolean(),
});

export const assessmentResultsSchema = z.object({
  high_risk_patients: z.array(z.string()),
  fever_patients: z.array(z.string()),
  data_quality_issues: z.array(z.string()),
});

export const submissionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  results: z.object({
    score: z.number(),
    percentage: z.number(),
    status: z.string(),
    breakdown: z.object({
      high_risk: z.object({
        score: z.number(),
        max: z.number(),
        correct: z.number(),
        submitted: z.number(),
        matches: z.number(),
      }),
      fever: z.object({
        score: z.number(),
        max: z.number(),
        correct: z.number(),
        submitted: z.number(),
        matches: z.number(),
      }),
      data_quality: z.object({
        score: z.number(),
        max: z.number(),
        correct: z.number(),
        submitted: z.number(),
        matches: z.number(),
      }),
    }),
    feedback: z.object({
      strengths: z.array(z.string()),
      issues: z.array(z.string()),
    }),
    attempt_number: z.number(),
    remaining_attempts: z.number(),
    is_personal_best: z.boolean(),
    can_resubmit: z.boolean(),
  }),
});

// Types
export type Patient = z.infer<typeof patientSchema>;
export type PatientsResponse = z.infer<typeof patientsResponseSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type RiskScore = z.infer<typeof riskScoreSchema>;
export type PatientWithRisk = z.infer<typeof patientWithRiskSchema>;
export type AssessmentResults = z.infer<typeof assessmentResultsSchema>;
export type SubmissionResponse = z.infer<typeof submissionResponseSchema>;
