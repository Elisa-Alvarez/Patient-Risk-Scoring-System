import type { Patient, PatientWithRisk, RiskScore } from "@shared/schema";

export function calculateBloodPressureRisk(bloodPressure: string | null): number {
  if (!bloodPressure || bloodPressure === "N/A" || bloodPressure === "INVALID" || bloodPressure.includes("INVALID")) {
    return 0; // Invalid/Missing Data
  }

  const bpParts = bloodPressure.split('/');
  if (bpParts.length !== 2) {
    return 0; // Invalid format
  }

  const systolic = parseInt(bpParts[0]);
  const diastolic = parseInt(bpParts[1]);

  if (isNaN(systolic) || isNaN(diastolic)) {
    return 0; // Non-numeric values
  }

  // Missing systolic or diastolic values
  if (bpParts[0] === '' || bpParts[1] === '') {
    return 0;
  }

  // Stage 2 (Systolic ≥140 OR Diastolic ≥90)
  if (systolic >= 140 || diastolic >= 90) {
    return 4;
  }

  // Stage 1 (Systolic 130‑139 OR Diastolic 80‑89)
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return 3;
  }

  // Elevated (Systolic 120‑129 AND Diastolic <80)
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return 2;
  }

  // Normal (Systolic <120 AND Diastolic <80)
  if (systolic < 120 && diastolic < 80) {
    return 1;
  }

  return 0; // Fallback for edge cases
}

export function calculateTemperatureRisk(temperature: number | null): number {
  if (temperature === null || isNaN(temperature)) {
    return 0; // Invalid/Missing Data
  }

  // High Fever (≥101.0°F)
  if (temperature >= 101.0) {
    return 2;
  }

  // Low Fever (99.6-100.9°F)
  if (temperature >= 99.6 && temperature <= 100.9) {
    return 1;
  }

  // Normal (≤99.5°F)
  if (temperature <= 99.5) {
    return 0;
  }

  return 0; // Fallback
}

export function calculateAgeRisk(age: number | null): number {
  if (age === null || isNaN(age)) {
    return 0; // Invalid/Missing Data
  }

  // Over 65 (>65 years)
  if (age > 65) {
    return 2;
  }

  // 40-65 (40-65 years, inclusive) and Under 40 (<40 years)
  if (age >= 40 && age <= 65) {
    return 1;
  }

  if (age < 40) {
    return 1;
  }

  return 0; // Fallback
}

export function calculateRiskScore(patient: Patient): RiskScore {
  const bloodPressure = calculateBloodPressureRisk(patient.blood_pressure);
  const temperature = calculateTemperatureRisk(patient.temperature);
  const age = calculateAgeRisk(patient.age);
  
  return {
    bloodPressure,
    temperature,
    age,
    total: bloodPressure + temperature + age,
  };
}

export function hasDataQualityIssues(patient: Patient): boolean {
  // Check for missing/invalid blood pressure
  if (!patient.blood_pressure || 
      patient.blood_pressure === "N/A" || 
      patient.blood_pressure.includes("INVALID") ||
      patient.blood_pressure.includes('/') === false ||
      patient.blood_pressure.split('/').some(part => part === '' || isNaN(parseInt(part)))) {
    return true;
  }

  // Check for missing/invalid temperature
  if (patient.temperature === null || 
      isNaN(patient.temperature) || 
      typeof patient.temperature === 'string') {
    return true;
  }

  // Check for missing/invalid age
  if (patient.age === null || 
      isNaN(patient.age) || 
      typeof patient.age === 'string') {
    return true;
  }

  return false;
}

export function hasFever(patient: Patient): boolean {
  if (patient.temperature === null || isNaN(patient.temperature)) {
    return false;
  }
  return patient.temperature >= 99.6;
}

export function calculateRiskScores(patients: Patient[]): PatientWithRisk[] {
  return patients.map(patient => {
    const riskScore = calculateRiskScore(patient);
    
    return {
      ...patient,
      riskScore,
      hasDataQualityIssues: hasDataQualityIssues(patient),
      hasFever: hasFever(patient),
      isHighRisk: riskScore.total >= 4,
    };
  });
}

export function generateAlertLists(patients: PatientWithRisk[]) {
  return {
    highRisk: patients.filter(p => p.isHighRisk),
    fever: patients.filter(p => p.hasFever),
    dataQuality: patients.filter(p => p.hasDataQualityIssues),
  };
}