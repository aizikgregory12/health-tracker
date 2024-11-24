/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      time
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
      time
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
      time
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
export const updateExerciseLog = /* GraphQL */ `
  mutation UpdateExerciseLog(
    $input: UpdateExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    updateExerciseLog(input: $input, condition: $condition) {
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
export const deleteExerciseLog = /* GraphQL */ `
  mutation DeleteExerciseLog(
    $input: DeleteExerciseLogInput!
    $condition: ModelExerciseLogConditionInput
  ) {
    deleteExerciseLog(input: $input, condition: $condition) {
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
export const createWeeklyGoal = /* GraphQL */ `
  mutation CreateWeeklyGoal(
    $input: CreateWeeklyGoalInput!
    $condition: ModelWeeklyGoalConditionInput
  ) {
    createWeeklyGoal(input: $input, condition: $condition) {
      id
      userId
      startOfWeek
      endOfWeek
      weeklyCaloriesGoal
      weeklyDurationGoal
      caloriesBurned
      duration
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateWeeklyGoal = /* GraphQL */ `
  mutation UpdateWeeklyGoal(
    $input: UpdateWeeklyGoalInput!
    $condition: ModelWeeklyGoalConditionInput
  ) {
    updateWeeklyGoal(input: $input, condition: $condition) {
      id
      userId
      startOfWeek
      endOfWeek
      weeklyCaloriesGoal
      weeklyDurationGoal
      caloriesBurned
      duration
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteWeeklyGoal = /* GraphQL */ `
  mutation DeleteWeeklyGoal(
    $input: DeleteWeeklyGoalInput!
    $condition: ModelWeeklyGoalConditionInput
  ) {
    deleteWeeklyGoal(input: $input, condition: $condition) {
      id
      userId
      startOfWeek
      endOfWeek
      weeklyCaloriesGoal
      weeklyDurationGoal
      caloriesBurned
      duration
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
