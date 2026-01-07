import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateReadingData {
  reading_insert: Reading_Key;
}

export interface CreateReadingVariables {
  metricId: UUIDString;
  value: number;
  context?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface GetMetricsData {
  metrics: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    unit: string;
    idealRangeMin?: number | null;
    idealRangeMax?: number | null;
  } & Metric_Key)[];
}

export interface GetRecommendationsData {
  recommendations: ({
    id: UUIDString;
    triggerMetric: {
      id: UUIDString;
      name: string;
    } & Metric_Key;
      content: string;
      type: string;
      intensity?: string | null;
      duration?: number | null;
      externalLink?: string | null;
  } & Recommendation_Key)[];
}

export interface Metric_Key {
  id: UUIDString;
  __typename?: 'Metric_Key';
}

export interface Reading_Key {
  id: UUIDString;
  __typename?: 'Reading_Key';
}

export interface Recommendation_Key {
  id: UUIDString;
  __typename?: 'Recommendation_Key';
}

export interface Session_Key {
  id: UUIDString;
  __typename?: 'Session_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetMetricsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMetricsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMetricsData, undefined>;
  operationName: string;
}
export const getMetricsRef: GetMetricsRef;

export function getMetrics(): QueryPromise<GetMetricsData, undefined>;
export function getMetrics(dc: DataConnect): QueryPromise<GetMetricsData, undefined>;

interface CreateReadingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReadingVariables): MutationRef<CreateReadingData, CreateReadingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReadingVariables): MutationRef<CreateReadingData, CreateReadingVariables>;
  operationName: string;
}
export const createReadingRef: CreateReadingRef;

export function createReading(vars: CreateReadingVariables): MutationPromise<CreateReadingData, CreateReadingVariables>;
export function createReading(dc: DataConnect, vars: CreateReadingVariables): MutationPromise<CreateReadingData, CreateReadingVariables>;

interface GetRecommendationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRecommendationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetRecommendationsData, undefined>;
  operationName: string;
}
export const getRecommendationsRef: GetRecommendationsRef;

export function getRecommendations(): QueryPromise<GetRecommendationsData, undefined>;
export function getRecommendations(dc: DataConnect): QueryPromise<GetRecommendationsData, undefined>;

