import React from 'react';
import { getRankingData } from '@/apis/ranking.api';
import RankingMain from '@/components/ranking/RankingMain';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `User Rankings | ${AppProperty.APP_NAME}`,
  description: `Ranking page of ${AppProperty.APP_NAME} where users can browse their rankings in courses.`,
};

async function Ranking() {
  const rankingData = await getRankingData();
  if (rankingData == null) throw new Error('Could not fetch ranking data');

  return <RankingMain rankings={rankingData} />;
}

export default Ranking;