import { Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import CommentForm from "../components/CommentForm";
import CommentComponent from "../components/Comment";
import VoteComponent from "../components/Vote";
import UpdatePost from "./UpdatePost";
import { useState } from "react";
import auth from "../lib/auth";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/posts/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const posts = await response.json();

  return posts;
};

const ShowPost = () => {
  const post = useLoaderData() as Post;
  const [showUpdatePost, setShowUpdatePost] = useState(false);

  const toggleUpdatePost = () => {
    setShowUpdatePost((prevState) => !prevState);
  };
  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${auth.getJWT()}`,
          },
        }
      );
  
      if (response.ok) {
        console.log('Post deleted successfully');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Delete Error:', error);
    }
    return redirect('/')
  };
  

  return (
    <>
      <div>
        <VoteComponent post={post} />
        <div>
          {post.link ? (
            <Link to={post.link}>
              <h2>
                {post.title}
                <span>({post.link})</span>
              </h2>
            </Link>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.userName}</p>
          {post.body && (
            <div>
              <p>{post.body}</p>
            </div>
          )}
              {post.image && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/files/${
                    post.image.id
                  }`}
                />
              )}
        </div>
        <div className="flex gap-4 justify-center items-center">
         {!showUpdatePost && <button onClick={toggleUpdatePost}>Update Post</button>} 
          {showUpdatePost && <UpdatePost /> }
          <button onClick={handleDeletePost}>Delete Post</button>
          </div>
      </div>
      <CommentForm postId={post._id} />
      {post.comments?.map((comment) => (
        <CommentComponent key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default ShowPost;