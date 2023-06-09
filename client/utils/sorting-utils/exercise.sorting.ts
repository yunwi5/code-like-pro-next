import { compareByDateTime, compareByDifficulty, compareByName } from '.';
import { SortingDirection, ExerciseSortingKey } from '../../models/enums';
import { IExerciseCard } from '../../models/interfaces';
import { ISortingState } from '../../store/redux/browsing-slice';

export function sortExercises(exercises: IExerciseCard[], sortingState: ISortingState) {
  if (sortingState.key === ExerciseSortingKey.NONE) return exercises;

  const isAsc = sortingState.direction === SortingDirection.ASCENDING;
  if (sortingState.key === ExerciseSortingKey.NAME) {
    return exercises.sort((a, b) => (isAsc ? compareByName(a, b) : compareByName(b, a)));
  }

  if (sortingState.key === ExerciseSortingKey.DATETIME) {
    return exercises.sort((a, b) =>
      isAsc
        ? compareByDateTime(a.createdAt, b.createdAt)
        : compareByDateTime(b.createdAt, a.createdAt),
    );
  }

  // Sort by favorite/like counts by users
  if (sortingState.key === ExerciseSortingKey.LIKES) {
    return exercises.sort((a, b) => (isAsc ? a.stars - b.stars : b.stars - a.stars));
  }

  // Sort by number of issue reports
  if (sortingState.key === ExerciseSortingKey.ISSUE_REPORTS) {
    return exercises.sort((a, b) => (isAsc ? a.reports - b.reports : b.reports - a.reports));
  }

  // Sort by difficulty
  // Ascending order will order the easiest challenges to the hardest challenges in difficulty.
  // Descending order is the other way around.
  if (sortingState.key === ExerciseSortingKey.DIFFICULTY) {
    return exercises.sort((a, b) =>
      isAsc ? compareByDifficulty(a, b) : compareByDifficulty(b, a),
    );
  }

  return exercises;
}
