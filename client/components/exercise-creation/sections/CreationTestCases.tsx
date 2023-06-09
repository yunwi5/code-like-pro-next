import React, { useState } from 'react';

import useUpdateEffect from '../../../hooks/utils/useUpdateEffect';
import { CreationSection } from '../../../models/enums';
import { ITestCaseProps } from '../../../models/interfaces';
import { useExerciseCreationContext } from '../../../store/context/ExerciseCreationContext';
import { getEmptyTestCase } from '../../../utils/exercise-utils/testcase';
import Button from '../../ui/buttons/Button';
import TestCase from '../../ui/test-cases/TestCase';
import CreationSectionContainer from '../containers/CreationSectionContainer';
import CreationHelp from '../creation-help/CreationHelp';

const CreationTestCases: React.FC = () => {
  const { testCases, language, setTestCases, testCaseOutputs } = useExerciseCreationContext();

  const addTestCase = () => {
    setTestCases((prevList) => [...prevList, getEmptyTestCase(testCases.length + 1)]);
  };

  const updateTestCase = (props: ITestCaseProps, index: number) => {
    const newList = [...testCases];
    newList[index] = { ...newList[index], ...props };
    setTestCases(newList);
  };

  const deleteTestCase = (targetIndex: number) => {
    setTestCases((prevList) => prevList.filter((test, idx) => idx !== targetIndex));
  };

  useUpdateEffect(() => {
    const idToScroll = `test-case-${testCases.length}`;
    document.getElementById(idToScroll)?.scrollIntoView({ behavior: 'smooth' });
  }, [testCases.length]);

  const title = (
    <div className="flex-between mb-2">
      <span>Test Cases</span>
      <Button className="!py-2 text-base md:text-lg" onClick={addTestCase}>
        + Test Case
      </Button>
    </div>
  );

  return (
    <CreationSectionContainer title={title} id={CreationSection.TEST_CASES}>
      <div className="flex flex-col gap-5">
        {testCases.map((testCase, idx) => {
          return (
            <TestCase
              key={idx}
              language={language}
              output={testCaseOutputs[idx]}
              testCase={{ ...testCase, name: `Test Case ${idx + 1}` }}
              onUpdate={(props: ITestCaseProps) => updateTestCase(props, idx)}
              onDelete={() => deleteTestCase(idx)}
            />
          );
        })}
      </div>
    </CreationSectionContainer>
  );
};

export default CreationTestCases;
