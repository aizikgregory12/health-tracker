/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHydrationLog = /* GraphQL */ `
  mutation CreateHydrationLog(
    $input: CreateHydrationLogInput!
    $condition: ModelHydrationLogConditionInput
  ) {
    createHydrationLog(input: $input, condition: $condition) {
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
export const updateHydrationLog = /* GraphQL */ `
  mutation UpdateHydrationLog(
    $input: UpdateHydrationLogInput!
    $condition: ModelHydrationLogConditionInput
  ) {
    updateHydrationLog(input: $input, condition: $condition) {
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
export const deleteHydrationLog = /* GraphQL */ `
  mutation DeleteHydrationLog(
    $input: DeleteHydrationLogInput!
    $condition: ModelHydrationLogConditionInput
  ) {
    deleteHydrationLog(input: $input, condition: $condition) {
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
export const createExerciseLog = /* GraphQL */ `
  mutation CreateExerciseLog(
    $input: CreateExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    createExerciseLog(input: $input, condition: $condition) {
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
export const updateExerciseLog = /* GraphQL */ `
  mutation UpdateExerciseLog(
    $input: UpdateExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    updateExerciseLog(input: $input, condition: $condition) {
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
export const deleteExerciseLog = /* GraphQL */ `
  mutation DeleteExerciseLog(
    $input: DeleteExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    deleteExerciseLog(input: $input, condition: $condition) {
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
export const createMealLog = /* GraphQL */ `
  mutation CreateMealLog(
    $input: CreateMealLogInput!
    $condition: ModelMealLogConditionInput
  ) {
    createMealLog(input: $input, condition: $condition) {
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
export const updateMealLog = /* GraphQL */ `
  mutation UpdateMealLog(
    $input: UpdateMealLogInput!
    $condition: ModelMealLogConditionInput
  ) {
    updateMealLog(input: $input, condition: $condition) {
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
export const deleteMealLog = /* GraphQL */ `
  mutation DeleteMealLog(
    $input: DeleteMealLogInput!
    $condition: ModelMealLogConditionInput
  ) {
    deleteMealLog(input: $input, condition: $condition) {
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
