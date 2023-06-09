import React from 'react';
import { redirect } from 'next/navigation';

import { getExerciseByIdData, getExercisesData } from '@/apis/exercise.api';
import ExerciseEditMain from '@/components/exercise-edit/ExerciseEditMain';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Edit Your Challenge | ${AppProperty.APP_NAME}`,
  description: `Exercise edit page of ${AppProperty.APP_NAME} where users can edit their programming challenge in various programming languages.`,
};

export const revalidate = 60;

export async function generateStaticParams() {
  const exercises = await getExercisesData({ authDisabled: true });
  if (exercises == null) return [];

  return exercises.map((exercise) => ({ id: exercise._id }));
}

type ExerciseEditPageProps = {
  params: { id: string };
};

async function ExerciseEditPage({ params: { id } }: ExerciseEditPageProps) {
  const exercise = await getExerciseByIdData(id, {
    catchErrors: false,
    authDisabled: true,
  });
  if (exercise == null) redirect('/');

  return <ExerciseEditMain exerciseId={id} exercise={exercise} />;
}

export default ExerciseEditPage;
