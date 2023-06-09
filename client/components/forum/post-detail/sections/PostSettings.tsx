import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteForumPost } from '../../../../apis/forum.api';
import { IForumPostPopulated } from '../../../../models/interfaces';
import { getForumPostEditLink } from '../../../../utils/links.util';
import { toastNotify } from '../../../../utils/notification.util';
import SettingsButton from '../../../ui/buttons/SettingsButton';
import DeleteModal from '../../../ui/modals/variations/DeleteModal';

// Post edit and deleting settings for post author control
const PostSettings: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
  const router = useRouter();

  // State for poping up the delete modal for the delete action.
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!post) return null;

  const handleDeleteAction = () => {
    router.push('/forum');
    toastNotify(`Successfully delete post ${post.name}`);
  };

  return (
    <>
      <SettingsButton
        className="ml-auto"
        onEdit={() => router.push(getForumPostEditLink(post?._id))}
        onDelete={() => setShowDeleteModal(true)}
      />

      {/* Show delete warning modal if the user clicks the delete action */}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        deleteFunction={deleteForumPost.bind(null, post._id)}
        onDelete={handleDeleteAction}
        item={`Forum Post ${post.name}`}
      />
    </>
  );
};

export default PostSettings;
