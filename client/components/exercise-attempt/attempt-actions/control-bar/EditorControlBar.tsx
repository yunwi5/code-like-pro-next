import React, { useEffect, useState } from 'react';

import useExerciseMutation from '../../../../hooks/exercise/exercise/useExerciseMutation';
import { useExerciseAttemptCtx } from '../../../../store/context/ExerciseAttemptContext';
import { useUserContext } from '../../../../store/context/UserContext';
import { getLanguageIcon, prettierLanguageName } from '../../../../utils/language.util';

import DifficultyRatingButton from './DifficultyRatingButton';
import ExerciseFavorite from './ExerciseFavorite';
import ExerciseReportButton from './ExerciseReportButton';
import ExerciseSettings from './ExerciseSettings';

// Control header that let users set language settings, favorite and report functionalities.
const EditorControlBar: React.FC = () => {
  const { userDetail } = useUserContext();
  const userId = userDetail?._id;

  const { exercise } = useExerciseAttemptCtx();
  const { postExerciseLike } = useExerciseMutation(exercise?._id || '');

  // State for whether the user liked the exercise or not.
  const [liked, setLiked] = useState(false);

  const handleLiked = async () => {
    setLiked((ps) => !ps);
    await postExerciseLike();
  };

  useEffect(() => {
    if (!exercise?._id || !userId) return;
    setLiked(exercise?.liked.includes(userId));
  }, [exercise, userId]);

  // Check if the user is an author of this exercise. If author, show the settings option.
  const isAuthor = exercise?.author._id === userId;

  if (!exercise) return null;

  return (
    <div className="flex items-center px-3 lg:pl-1 lg:pr-4 py-[0.55rem] lg:py-[0.375rem] ">
      {/* Language settings */}
      <div
        className={`px-3 py-[0.3rem] flex-center bg-slate-50 hover:bg-slate-100 text-gray-600 gap-2 rounded shadow transition-all`}
      >
        {getLanguageIcon(exercise.language, {
          width: '25px',
          height: '25px',
        })}
        {prettierLanguageName(exercise.language || '')}
      </div>

      {/* Favorite toggler */}
      <ExerciseFavorite
        key={`exercise-favorite-${exercise.liked.join('.')}`}
        liked={liked}
        onToggleLike={handleLiked}
      />

      <ExerciseReportButton />

      <DifficultyRatingButton />
      {isAuthor && <ExerciseSettings />}
    </div>
  );
};

export default EditorControlBar;
