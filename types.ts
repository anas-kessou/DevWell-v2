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
  fatigueLevel?: number; // 1-9 scale
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

export type SubscriptionTier = 'free' | 'pro' | 'zin-pro';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  tier: SubscriptionTier;
  createdAt: number;
  lastActive: number;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  issue: 'general' | 'support' | 'feedback' | 'billing';
  message: string;
  status: 'open' | 'closed' | 'pending';
  userId?: string;
  timestamp: number;
}

export interface UserActivityData {
  hour: number;
  activeUsers: number;
  freeUsers: number;
  proUsers: number;
}

export interface AlertHistogramBucket {
  alertRange: string; // e.g., "0-5", "6-10"
  userCount: number;
}

export interface FeedbackReport {
  summary: string;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topIssues: string[];
  suggestions: string[];
  trends: string;
  actionItems: string[];
  generatedAt: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  usageMinutes: number;
  sessionCount: number;
}

// For the progress line graph
export interface ProgressDataPoint {
  date: string; // MM/DD
  timestamp: number;
  productivityScore: number;
  avgFatigue: number;
}
