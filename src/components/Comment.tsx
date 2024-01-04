import { Comment } from '../types';
import { redirect } from 'react-router-dom';
import auth from '../lib/auth';

export const deleteComment = async ({ postId, commentId }: { postId: string; commentId: string }) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${auth.getJWT()}`,
        },
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return redirect(`posts/${postId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

const CommentComponent = ({ comment, handleDeleteComment }: { comment: Comment; handleDeleteComment: (commentId: string) => void }) => {
  return (
    <div>
      <p>{comment.author.userName}</p>
      <p>{comment.body}</p>
      <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
    </div>
  );
};

export default CommentComponent;
