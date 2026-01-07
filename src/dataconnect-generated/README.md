# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMetrics*](#getmetrics)
  - [*GetRecommendations*](#getrecommendations)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateReading*](#createreading)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMetrics
You can execute the `GetMetrics` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMetrics(): QueryPromise<GetMetricsData, undefined>;

interface GetMetricsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMetricsData, undefined>;
}
export const getMetricsRef: GetMetricsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMetrics(dc: DataConnect): QueryPromise<GetMetricsData, undefined>;

interface GetMetricsRef {
  ...
  (dc: DataConnect): QueryRef<GetMetricsData, undefined>;
}
export const getMetricsRef: GetMetricsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMetricsRef:
```typescript
const name = getMetricsRef.operationName;
console.log(name);
```

### Variables
The `GetMetrics` query has no variables.
### Return Type
Recall that executing the `GetMetrics` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMetricsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMetrics`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMetrics } from '@dataconnect/generated';


// Call the `getMetrics()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMetrics();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMetrics(dataConnect);

console.log(data.metrics);

// Or, you can use the `Promise` API.
getMetrics().then((response) => {
  const data = response.data;
  console.log(data.metrics);
});
```

### Using `GetMetrics`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMetricsRef } from '@dataconnect/generated';


// Call the `getMetricsRef()` function to get a reference to the query.
const ref = getMetricsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMetricsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.metrics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.metrics);
});
```

## GetRecommendations
You can execute the `GetRecommendations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRecommendations(): QueryPromise<GetRecommendationsData, undefined>;

interface GetRecommendationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRecommendationsData, undefined>;
}
export const getRecommendationsRef: GetRecommendationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRecommendations(dc: DataConnect): QueryPromise<GetRecommendationsData, undefined>;

interface GetRecommendationsRef {
  ...
  (dc: DataConnect): QueryRef<GetRecommendationsData, undefined>;
}
export const getRecommendationsRef: GetRecommendationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRecommendationsRef:
```typescript
const name = getRecommendationsRef.operationName;
console.log(name);
```

### Variables
The `GetRecommendations` query has no variables.
### Return Type
Recall that executing the `GetRecommendations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRecommendationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetRecommendations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRecommendations } from '@dataconnect/generated';


// Call the `getRecommendations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRecommendations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRecommendations(dataConnect);

console.log(data.recommendations);

// Or, you can use the `Promise` API.
getRecommendations().then((response) => {
  const data = response.data;
  console.log(data.recommendations);
});
```

### Using `GetRecommendations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRecommendationsRef } from '@dataconnect/generated';


// Call the `getRecommendationsRef()` function to get a reference to the query.
const ref = getRecommendationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRecommendationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.recommendations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.recommendations);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateReading
You can execute the `CreateReading` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createReading(vars: CreateReadingVariables): MutationPromise<CreateReadingData, CreateReadingVariables>;

interface CreateReadingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReadingVariables): MutationRef<CreateReadingData, CreateReadingVariables>;
}
export const createReadingRef: CreateReadingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createReading(dc: DataConnect, vars: CreateReadingVariables): MutationPromise<CreateReadingData, CreateReadingVariables>;

interface CreateReadingRef {
  ...
  (dc: DataConnect, vars: CreateReadingVariables): MutationRef<CreateReadingData, CreateReadingVariables>;
}
export const createReadingRef: CreateReadingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createReadingRef:
```typescript
const name = createReadingRef.operationName;
console.log(name);
```

### Variables
The `CreateReading` mutation requires an argument of type `CreateReadingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateReadingVariables {
  metricId: UUIDString;
  value: number;
  context?: string | null;
}
```
### Return Type
Recall that executing the `CreateReading` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateReadingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateReadingData {
  reading_insert: Reading_Key;
}
```
### Using `CreateReading`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createReading, CreateReadingVariables } from '@dataconnect/generated';

// The `CreateReading` mutation requires an argument of type `CreateReadingVariables`:
const createReadingVars: CreateReadingVariables = {
  metricId: ..., 
  value: ..., 
  context: ..., // optional
};

// Call the `createReading()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createReading(createReadingVars);
// Variables can be defined inline as well.
const { data } = await createReading({ metricId: ..., value: ..., context: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createReading(dataConnect, createReadingVars);

console.log(data.reading_insert);

// Or, you can use the `Promise` API.
createReading(createReadingVars).then((response) => {
  const data = response.data;
  console.log(data.reading_insert);
});
```

### Using `CreateReading`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createReadingRef, CreateReadingVariables } from '@dataconnect/generated';

// The `CreateReading` mutation requires an argument of type `CreateReadingVariables`:
const createReadingVars: CreateReadingVariables = {
  metricId: ..., 
  value: ..., 
  context: ..., // optional
};

// Call the `createReadingRef()` function to get a reference to the mutation.
const ref = createReadingRef(createReadingVars);
// Variables can be defined inline as well.
const ref = createReadingRef({ metricId: ..., value: ..., context: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createReadingRef(dataConnect, createReadingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reading_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reading_insert);
});
```

