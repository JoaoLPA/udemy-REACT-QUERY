import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import './PostDetail.css';

export function PostDetail({ post, deleteMutation, updateMutation }) {
  const postId = post?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(postId)}>Delete</button>
      {deleteMutation.isPending && <p className='loading'>Deleting post</p>}
      {deleteMutation.isError && (
        <p className='error'>
          Error deleting the post: {deleteMutation.error.toString()}
        </p>
      )}
      {deleteMutation.isSuccess && <p className='success'>Post deleted</p>}
      <button onClick={() => updateMutation.mutate(postId)}>
        Update title
      </button>
      {updateMutation.isPending && <p className='loading'>Updating post</p>}
      {updateMutation.isSuccess && <p className='success'>Post updated</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
