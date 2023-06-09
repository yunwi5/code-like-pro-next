import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReplyComments } from '../../../apis/comment.api';
import { getReplyCommentsKey } from '../keys';

function useReplyCommentsQuery(commentId: string, refetchInterval: number = 1000) {
  const queryClient = useQueryClient();

  // Fetch reply (sub) comments.
  const commentQueryKey = getReplyCommentsKey(commentId);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery([commentQueryKey], () => getReplyComments(commentId), {
    refetchInterval,
    enabled: !!commentId,
  });
  if (error) console.log(error);

  const replyComments = response?.data || [];

  const refetch = () => queryClient.refetchQueries([commentQueryKey]);

  return { replyComments, isLoading, refetch };
}

export default useReplyCommentsQuery;
