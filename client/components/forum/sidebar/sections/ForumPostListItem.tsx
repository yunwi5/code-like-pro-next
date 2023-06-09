import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { IForumPost } from '../../../../models/interfaces';
import { getDateTimeFormat } from '../../../../utils/datetime.util';
import { ForumPostTypeIcons } from '../../../../utils/forum.util';
import { getForumPostLink } from '../../../../utils/links.util';
import { getVoteCounts } from '../../../../utils/votes.util';

const ForumPostListItem: React.FC<{ post: IForumPost }> = ({ post }) => {
  const postId = useParams().postId;
  const isActive = postId === post._id;
  const activeClass = isActive ? 'border-l-[5px] border-l-main-300 bg-slate-200' : '';

  const { upVoteCount, downVoteCount } = getVoteCounts(post.votes || []);

  return (
    <article
      className={`flex flex-col gap-1 px-3 pt-3 pb-2 border-b-2 last:border-b-0 border-b-slate-300 ${activeClass}`}
    >
      <header className="flex gap-2">
        <span className="text-main-400/80">{ForumPostTypeIcons[post.postType]}</span>
        <h3 className={'text-gray-600 text-base lg:text-lg hover:text-main-500 cursor-pointer'}>
          <Link href={getForumPostLink(post)}>{post.name}</Link>
        </h3>
      </header>
      <ul className="text-sm md:text-[0.925rem] mt-4 lg:mt-2 flex flex-wrap gap-x-4 gap-y-2">
        <li className="flex gap-1">
          <FaUserEdit className="text-gray-600 text-[1.2em]" />
          {post.author.name}
        </li>
        <li className="flex gap-1">
          <MdDateRange className="text-sky-500/80 text-[1.2em]" />
          {getDateTimeFormat(post.createdAt)}
        </li>
        <li className="flex gap-1">
          <AiOutlineLike className="text-blue-600 text-[1.2em]" />
          {upVoteCount}
        </li>
        <li className="flex gap-1">
          <AiOutlineDislike className="text-fuchsia-600 text-[1.2em]" />
          {downVoteCount}
        </li>
      </ul>
    </article>
  );
};

export default ForumPostListItem;
