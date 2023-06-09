import React, { useMemo, useState } from 'react';

import { IExerciseWithId } from '../../../../models/interfaces';
import { getDifficultyBtnClass, getOverallDifficulty } from '../../../../utils/difficulty.util';
import HoveringLabel from '../../../ui/tooltip/HoveringLabel';
import DifficultyModal from '../../modals/difficulty-modal/DifficultyModal';

const PromptDifficultyLabel: React.FC<{ exercise: IExerciseWithId }> = ({ exercise }) => {
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);

  const { overallDifficulty } = useMemo(() => getOverallDifficulty(exercise), [exercise]);

  const colorClass = useMemo(() => getDifficultyBtnClass(overallDifficulty), [overallDifficulty]);

  return (
    <>
      <HoveringLabel
        label="Rate Difficulty"
        className="!text-sm"
        tooltipClassName="top-[105%]"
        onClick={() => setShowDifficultyModal(true)}
      >
        <button className={`px-2 py-1 text-sm md:text-base border-2 ${colorClass} rounded-lg`}>
          {overallDifficulty}
        </button>
      </HoveringLabel>

      <DifficultyModal open={showDifficultyModal} onClose={() => setShowDifficultyModal(false)} />
    </>
  );
};

export default PromptDifficultyLabel;
