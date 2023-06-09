import React from 'react';

import BadgeSpecs from '../../ui/badges/badge-specs/BadgeSpecs';

import AboutBadges from './AboutBadges';

// Badge introduction and badge rarity explanations
const HomeBadges: React.FC = () => {
  return (
    <section className="mt-[8rem]">
      <h2
        className={`mb-5 lg:mb-12 px-2 sm:px-10 text-center text-3xl text-gray-500 font-semibold capitalize`}
      >
        Engage more and get tons of rewards!
      </h2>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-x-6 gap-y-5 max-w-[min(97vw,84rem)] mx-auto">
        <AboutBadges className="order-2 lg:order-first self-stretch basis-[34%]" />
        <BadgeSpecs className="grow basis-[66%]" />
      </div>
    </section>
  );
};

export default HomeBadges;
