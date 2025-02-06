/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHydrationLog = /* GraphQL */ `
  query GetHydrationLog($id: ID!) {
    getHydrationLog(id: $id) {
      id
      userId
      amount
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listHydrationLogs = /* GraphQL */ `
  query ListHydrationLogs(
    $filter: ModelHydrationLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHydrationLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        amount
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getExerciseLog = /* GraphQL */ `
  query GetExerciseLog($id: ID!) {
    getExerciseLog(id: $id) {
      id
      userId
      name
      duration
      intensity
      caloriesBurned
      date
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listExerciseLogs = /* GraphQL */ `
  query ListExerciseLogs(
    $filter: ModelExerciseLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExerciseLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        duration
        intensity
        caloriesBurned
        date
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMealLog = /* GraphQL */ `
  query GetMealLog($id: ID!) {
    getMealLog(id: $id) {
      id
      userId
      name
      portionSize
      calories
      protein
      carbs
      fats
      date
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listMealLogs = /* GraphQL */ `
  query ListMealLogs(
    $filter: ModelMealLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMealLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        portionSize
        calories
        protein
        carbs
        fats
        date
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
