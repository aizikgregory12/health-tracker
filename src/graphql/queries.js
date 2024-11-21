/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      time
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
        time
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
      exerciseName
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
        exerciseName
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
