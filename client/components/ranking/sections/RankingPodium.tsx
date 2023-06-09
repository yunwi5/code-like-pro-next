import React from 'react';
import { motion } from 'framer-motion';

import { IRanking } from '../../../models/interfaces';
import ProfileView from '../../ui/user/profile-view/ProfileView';

interface Props {
  rankingOrder: IRanking[];
  className?: string;
}

const podiumOrder = [1, 0, 2];
const colorClasses = ['text-main-400', 'text-purple-500', 'text-fuchsia-500/90'];

const RankingPodium: React.FC<Props> = ({ rankingOrder, className = '' }) => {
  return (
    <section className={`flex justify-between items-end gap-[5%] px-1 ${className}`}>
      {podiumOrder.map((rankIndex) => {
        if (rankIndex >= rankingOrder.length) return null;

        return (
          <motion.div
            key={rankIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: rankIndex * 0.15 },
            }}
            viewport={{ once: true }}
            className="grow flex flex-col"
          >
            <div className="text-center text-gray-500 text-lg font-bold inline-block">
              <ProfileView
                user={rankingOrder[rankIndex]}
                className="flex flex-col gap-1 mb-2 !text-left text-base"
                size={'5rem'}
                hoverModalClassName={'!hidden'}
              />
              <div
                style={{
                  height: 100 - rankIndex * 25,
                }}
                className={`text-3xl sm:text-4xl flex justify-center items-center rounded ${colorClasses[rankIndex]} bg-gray-100 shadow-lg`}
              >
                {rankIndex + 1}
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default RankingPodium;
