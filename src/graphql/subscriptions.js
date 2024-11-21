/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMealLog = /* GraphQL */ `
  subscription OnCreateMealLog(
    $filter: ModelSubscriptionMealLogFilterInput
    $owner: String
  ) {
    onCreateMealLog(filter: $filter, owner: $owner) {
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
export const onUpdateMealLog = /* GraphQL */ `
  subscription OnUpdateMealLog(
    $filter: ModelSubscriptionMealLogFilterInput
    $owner: String
  ) {
    onUpdateMealLog(filter: $filter, owner: $owner) {
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
export const onDeleteMealLog = /* GraphQL */ `
  subscription OnDeleteMealLog(
    $filter: ModelSubscriptionMealLogFilterInput
    $owner: String
  ) {
    onDeleteMealLog(filter: $filter, owner: $owner) {
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
export const onCreateExerciseLog = /* GraphQL */ `
  subscription OnCreateExerciseLog(
    $filter: ModelSubscriptionExerciseLogFilterInput
    $owner: String
  ) {
    onCreateExerciseLog(filter: $filter, owner: $owner) {
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
export const onUpdateExerciseLog = /* GraphQL */ `
  subscription OnUpdateExerciseLog(
    $filter: ModelSubscriptionExerciseLogFilterInput
    $owner: String
  ) {
    onUpdateExerciseLog(filter: $filter, owner: $owner) {
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
export const onDeleteExerciseLog = /* GraphQL */ `
  subscription OnDeleteExerciseLog(
    $filter: ModelSubscriptionExerciseLogFilterInput
    $owner: String
  ) {
    onDeleteExerciseLog(filter: $filter, owner: $owner) {
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
