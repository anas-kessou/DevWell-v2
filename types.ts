
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum EventType {
  FATIGUE = 'FATIGUE',
  POSTURE = 'POSTURE',
  STRESS = 'STRESS',
  FOCUS = 'FOCUS'
}

export interface HealthEvent {
  id: string;
  type: EventType;
  severity: Severity;
  description: string;
  timestamp: number;
}

export interface BurnoutForecast {
  riskScore: number;
  forecastPath: number[];
  reasoning: string;
  actionPlan: string;
}

export interface BioBlueprint {
  focusAreas: string[];
  suggestedStretches: string[];
  nutritionTip: string;
  productivityWindow: string;
}

export interface WellnessStats {
  streak: number;
  zenCredits: number;
  level: string;
  pointsToNextLevel: number;
}

export interface PlatformAnalytics {
  totalUsers: number;
  activeSessions: number;
  avgSystemWellness: number;
  sentimentSummary: string;
  directives: string[];
}

export interface PrivacySettings {
  anonymizeAI: boolean;
  encryptLogs: boolean;
  encryptionLevel: 'Standard' | 'AES-256' | 'Quantum-Resistant';
  dataRetentionDays: number;
  allowAggregateTraining: boolean;
}
