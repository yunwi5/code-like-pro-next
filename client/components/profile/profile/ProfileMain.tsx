'use client';
import React, { useMemo } from 'react';
import { ClipLoader } from 'react-spinners';

import useBadgeQuery from '../../../hooks/badges/useBadgeQuery';
import useRanking from '../../../hooks/ranking/useRanking';
import {
  ProfileEditContextProvider,
  useProfileEditContext,
} from '../../../store/context/ProfileEditContext';
import { useUserContext } from '../../../store/context/UserContext';
import { getDateFormat } from '../../../utils/datetime.util';
import { getUsedLanguagesByUser } from '../../../utils/language.util';
import { numberSuffix } from '../../../utils/number.util';
import Badges from '../../ui/badges/Badges';
import Button from '../../ui/buttons/Button';
import ProfileLoader from '../ProfileLoader';

import ProfileAvatar from './avatars/ProfileAvatar';
import ProfileInfoItem from './sections/ProfileInfoItem';
import ProfileInput from './sections/ProfileInput';

const ProfileMain = () => {
  const { userDetail } = useUserContext();
  // Loading state
  if (!userDetail) return <ProfileLoader />;

  return (
    <ProfileEditContextProvider>
      <ProfileMainBody />
    </ProfileEditContextProvider>
  );
};

const ProfileMainBody = () => {
  const { userDetail } = useUserContext();
  const { getUserRank, rankingOrder } = useRanking();
  const { badges } = useBadgeQuery(userDetail?._id);

  const { profileName, setProfileName, description, isEditing, setDescription, onSubmitProfile } =
    useProfileEditContext();

  // Current user ranking data
  const userRankData = useMemo(() => {
    if (!userDetail?._id) return null;
    return getUserRank(userDetail._id);
  }, [userDetail?._id, getUserRank]);

  // Loading state
  if (!userDetail) return <ProfileLoader />;

  // Calculate basic statistics for the profile page.
  const solvedExercisesCount = userDetail.submissions.filter((sub) => sub.correct).length;
  const createdExerciseCount = userDetail.exercises.length;
  const usedLanguages = getUsedLanguagesByUser(userDetail.submissions);

  // Show badges only if it is not EDIT mode, and there are at least 1 badges.
  const showBadges = !isEditing && (badges?.length || 0) > 0;

  return (
    <form className="relative flex-1" onSubmit={onSubmitProfile}>
      <div className="flex flex-col pl-7 pr-4 py-3">
        <ProfileHeader />
        <ProfileAvatar />

        {/* Profile information */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-5 gap-y-[1.75rem] mt-3">
          {isEditing ? (
            <ProfileInput
              label="Username"
              value={profileName}
              onChange={(newValue) => setProfileName(newValue)}
            />
          ) : (
            <ProfileInfoItem
              label="Username"
              value={profileName}
              className="md:col-span-2 md:max-w-[65%]"
            />
          )}

          {isEditing ? (
            <ProfileInput
              label="About Me"
              type="textarea"
              value={description}
              onChange={(newValue) => setDescription(newValue)}
              className="md:col-span-2"
            />
          ) : (
            <ProfileInfoItem
              label="About Me"
              value={description}
              className="md:col-span-2 md:max-w-[65%]"
            />
          )}

          <ProfileInfoItem label="Email" value={userDetail.email} />
          <ProfileInfoItem label="Member Since" value={getDateFormat(userDetail.createdAt)} />

          <ProfileInfoItem label="Languages" value={usedLanguages.join(', ')} />

          {/* User ranking data displayed only if the data exists. Otherwise, loading spinner */}
          {userRankData ? (
            <ProfileInfoItem
              label="Ranking Points"
              value={`${userRankData.creationPoints + userRankData.solvingPoints} (${numberSuffix(
                userRankData.order,
              )})`}
            />
          ) : (
            <ClipLoader color="#5552e4" size={35} />
          )}

          <ProfileInfoItem label="Exercises Created" value={createdExerciseCount} />
          <ProfileInfoItem label="Exercises Solved" value={solvedExercisesCount} />
        </div>

        {/* Profile badges */}
        {showBadges && (
          <div id="badges" className="flex flex-col mt-10 mb-3">
            <Badges heading={<h2 className="text-2xl">My Badges</h2>} badges={badges || []} />
          </div>
        )}
      </div>
      <ProfileButtons />
    </form>
  );
};

// eslint-disable-next-line react/display-name
const ProfileHeader = React.memo(() => (
  <div className="flex flex-col">
    <h2 className="text-2xl">My Profile</h2>
    <p className="text-gray-500">Your profile is publicly shown to other users.</p>
  </div>
));

// Profile group of action buttons (edit, cancel and submit)
const ProfileButtons = () => {
  const { isLoading, isEditing, setIsEditing, onSubmitProfile, cancelEdit } =
    useProfileEditContext();

  const handleAction = () => {
    if (!isEditing) return setIsEditing(true);
    onSubmitProfile();
  };

  return (
    <div className="flex gap-3 md:justify-end px-3 py-3 md:pr-[3rem] border-t-[3px] border-gray-300">
      {isLoading && <ClipLoader size={40} color="#5552e4" />}
      {!isLoading && (
        <>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn min-w-[6.5rem] border-2 border-gray-500 hover:bg-gray-500 hover:text-white"
            >
              Cancel
            </button>
          )}
          <Button type={'button'} className="rounded-sm" onClick={handleAction}>
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </>
      )}
    </div>
  );
};

export default ProfileMain;
