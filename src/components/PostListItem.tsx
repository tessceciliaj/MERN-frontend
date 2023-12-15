import { Link } from "react-router-dom"
import { Post } from "../types"

const PostListItem = ({post}: {post: Post}) => {
  return (
    <div className="flex flex-col p-4 border-2 border-white">
      { post.link ? (
        <Link to={post.link}>
            <h2 className="text-3xl">{post.title}</h2>
        </Link>
      ): (
        <Link to={`/posts/${post._id}`}>
        <h2>{post.title}</h2>
        </Link>
      )}
       <p className="font-light"> by {post.author.userName}</p>
       {post.link && (
        <span><Link to={`/posts/${post._id}`}></Link></span>
       )}
    </div>
  )
}

export default PostListItem
