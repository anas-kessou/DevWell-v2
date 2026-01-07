import { CreateUserData, CreateUserVariables, GetMetricsData, CreateReadingData, CreateReadingVariables, GetRecommendationsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetMetrics(options?: useDataConnectQueryOptions<GetMetricsData>): UseDataConnectQueryResult<GetMetricsData, undefined>;
export function useGetMetrics(dc: DataConnect, options?: useDataConnectQueryOptions<GetMetricsData>): UseDataConnectQueryResult<GetMetricsData, undefined>;

export function useCreateReading(options?: useDataConnectMutationOptions<CreateReadingData, FirebaseError, CreateReadingVariables>): UseDataConnectMutationResult<CreateReadingData, CreateReadingVariables>;
export function useCreateReading(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReadingData, FirebaseError, CreateReadingVariables>): UseDataConnectMutationResult<CreateReadingData, CreateReadingVariables>;

export function useGetRecommendations(options?: useDataConnectQueryOptions<GetRecommendationsData>): UseDataConnectQueryResult<GetRecommendationsData, undefined>;
export function useGetRecommendations(dc: DataConnect, options?: useDataConnectQueryOptions<GetRecommendationsData>): UseDataConnectQueryResult<GetRecommendationsData, undefined>;
