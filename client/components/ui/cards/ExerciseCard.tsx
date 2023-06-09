import React, { useState } from 'react';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { BsClock, BsFillTagsFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import { deleteExercise } from '../../../apis/exercise.api';
import useExerciseSubmissionsQuery from '../../../hooks/exercise/exercise-submissions.tsx/useExerciseSubmissionsQuery';
import { IExerciseCard } from '../../../models/interfaces';
import { useUserContext } from '../../../store/context/UserContext';
import { getDateFormat } from '../../../utils/datetime.util';
import { getDifficultyBtnClass } from '../../../utils/difficulty.util';
import { getExerciseAttemptPageLink, getExerciseEditLink } from '../../../utils/links.util';
import { getSubmissionStats } from '../../../utils/user-submission.util';
import DeleteButton from '../buttons/icon-buttons/DeleteButton';
import EditButton from '../buttons/icon-buttons/EditButton';
import LanguageLabel from '../icons/LanguageIcon';
import DeleteModal from '../modals/variations/DeleteModal';
import HoveringLabel from '../tooltip/HoveringLabel';

interface Props {
  exercise: IExerciseCard;
  className?: string;
}

const ExerciseCard: React.FC<Props> = ({ exercise, className = '' }) => {
  const router = useRouter();
  const { likedExerciseIdSet } = useUserContext();
  const { submissions } = useExerciseSubmissionsQuery(exercise?._id || '');
  const { correctRate } = getSubmissionStats(submissions || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const liked: boolean = likedExerciseIdSet.has(exercise?._id || '');
  const difficultyStyle = getDifficultyBtnClass(exercise.difficulty);

  const navigateToAttempt = () => router.push(getExerciseAttemptPageLink(exercise._id));

  const exerciseControl = exercise?.isAuthorized ? (
    <ExerciseControl
      onEdit={() => router.push(getExerciseEditLink(exercise._id))}
      onDelete={() => setShowDeleteModal(true)}
    />
  ) : null;

  const tags = exercise.tags.sort().slice(0, 5);

  return (
    <>
      <article
        onClick={!exercise?.isAuthorized ? navigateToAttempt : undefined}
        className={`flex flex-col gap-4 px-4 py-2 text-gray-700 hover:bg-gray-200 border-2 border-gray-200/90 rounded-sm transition-all shadow-md hover:shadow-lg cursor-pointer ${className}`}
      >
        {/* Exercise name, difficulty and language */}
        <header className="flex-start gap-3">
          <h3
            onClick={navigateToAttempt}
            className="text-base sm:text-[1.13rem] hover:text-blue-600"
          >
            {exercise.name}
          </h3>
          <div
            className={`flex-center px-[0.4rem] py-[1.5px] sm:py-[2px] text-[0.8rem] sm:text-sm rounded-md ${difficultyStyle}`}
          >
            {exercise.difficulty}
          </div>
          {liked && (
            <HoveringLabel label={'Favorited'}>
              <AiFillStar className="text-yellow-500/70 text-2xl" />
            </HoveringLabel>
          )}
          <LanguageLabel language={exercise.language} className="ml-auto" />
        </header>

        {/* Exercise Info */}
        <ul className="flex-start flex-wrap gap-2 text-[0.82rem] sm:text-sm">
          <li className="flex-start gap-1">
            <FaUser className="text-gray-600 text-base" /> {exercise.author?.name || 'Anonymous'}
          </li>
          <li className="flex-start gap-1">
            <AiFillStar className="text-yellow-500/80 text-base" /> {exercise.stars}
          </li>
          <li className="flex-start gap-1">
            <AiFillCheckCircle className="text-emerald-400/80 text-base" />
            {correctRate}%
          </li>
          <li className="flex-start gap-1">
            <BsClock className="text-blue-500/80 text-base" /> {getDateFormat(exercise.createdAt)}
          </li>
          <li className="hidden sm:flex justify-start items-center gap-1">
            <MdReportProblem className="text-stone-500/80 text-base" /> {exercise.reports} Reports
          </li>

          {/* If the user is authorized (either creator or admin), give edit and delete accesses */}
          <li className="ml-auto sm:hidden">{exerciseControl}</li>
        </ul>

        <div className={`hidden sm:flex flex-between`}>
          {/* Tags List. Tags will only be shown on the card for 640px screen size or above. */}
          {/* On the mobile screen size, rendering tag list makes it look worse. */}
          <ul className="flex-start flex-wrap gap-2 text-[0.85rem]">
            <BsFillTagsFill className="text-lg text-slate-500" />

            {/* Display maximum 5 tags. Fist 5 tags in this case. */}
            {tags.map((tag, idx) => (
              <li
                key={idx}
                className="px-2 py-[0.125rem] bg-gray-400/40 hover:bg-gray-600/90 hover:text-gray-50 rounded-sm"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* If the user is authorized (either creator or admin), give edit and delete accesses */}
          {exerciseControl}
        </div>
      </article>

      {/* Popup for delete operation confirmation */}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        deleteFunction={deleteExercise.bind(null, exercise?._id)}
        item={`Exercise "${exercise?.name}"`}
      />
    </>
  );
};

interface ControlProps {
  onEdit: () => void;
  onDelete: () => void;
}
const ExerciseControl: React.FC<ControlProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex-start gap-1">
      <EditButton onEdit={onEdit} />
      <DeleteButton onDelete={onDelete} />
    </div>
  );
};

export default ExerciseCard;
