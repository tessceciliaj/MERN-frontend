import { Comment } from '../types'

const CommentComponent = ({comment}: {comment: Comment}) => {
  return (
    <div>
      <p>{comment.author.userName}</p>
      <p>{comment.body}</p>
    </div>
  )
}

export default CommentComponent;