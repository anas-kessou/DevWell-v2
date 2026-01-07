const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'devwell12',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getMetricsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMetrics');
}
getMetricsRef.operationName = 'GetMetrics';
exports.getMetricsRef = getMetricsRef;

exports.getMetrics = function getMetrics(dc) {
  return executeQuery(getMetricsRef(dc));
};

const createReadingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateReading', inputVars);
}
createReadingRef.operationName = 'CreateReading';
exports.createReadingRef = createReadingRef;

exports.createReading = function createReading(dcOrVars, vars) {
  return executeMutation(createReadingRef(dcOrVars, vars));
};

const getRecommendationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecommendations');
}
getRecommendationsRef.operationName = 'GetRecommendations';
exports.getRecommendationsRef = getRecommendationsRef;

exports.getRecommendations = function getRecommendations(dc) {
  return executeQuery(getRecommendationsRef(dc));
};
