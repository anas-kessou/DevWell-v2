import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'devwell12',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getMetricsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMetrics');
}
getMetricsRef.operationName = 'GetMetrics';

export function getMetrics(dc) {
  return executeQuery(getMetricsRef(dc));
}

export const createReadingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateReading', inputVars);
}
createReadingRef.operationName = 'CreateReading';

export function createReading(dcOrVars, vars) {
  return executeMutation(createReadingRef(dcOrVars, vars));
}

export const getRecommendationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecommendations');
}
getRecommendationsRef.operationName = 'GetRecommendations';

export function getRecommendations(dc) {
  return executeQuery(getRecommendationsRef(dc));
}

