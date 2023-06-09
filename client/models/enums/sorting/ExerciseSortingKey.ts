export enum ExerciseSortingKey {
  NONE = 'None',
  NAME = 'Name',
  DATETIME = 'Date & time',
  DIFFICULTY = 'Difficulty',
  LIKES = 'Likes',
  ISSUE_REPORTS = 'Issue Reports',
}

export const ExerciseSortingKeyList = Object.freeze(Object.values(ExerciseSortingKey));
