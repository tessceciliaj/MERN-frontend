import { ActionFunctionArgs, Link, useFetcher } from "react-router-dom"
import auth from "../lib/auth"
import { Post } from "../types"
import { useRef } from "react"

export const action = async (args: ActionFunctionArgs) => {
	const { postId } = args.params
	const formData = await args.request.formData()

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL + "posts/" + postId + "/comments",
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.getJWT(),
			},
			method: "POST",
			body: JSON.stringify({ commentBody: formData.get("body") }),
		},
	)

	if (!response.ok) {
		const { message } = await response.json()

		return { message }
	}

	const post = (await response.json()) as Post

	return {
		comments: post.comments,
	}
}

export const updateComment = async (args: ActionFunctionArgs) => {
	const { postId, commentId } = args.params
	const formData = await args.request.formData()

	const response = await fetch(
		import.meta.env.VITE_BACKEND_URL +
			"posts/" +
			postId +
			"/comments/" +
			commentId,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.getJWT(),
			},
			method: "PUT",
			body: JSON.stringify({ commentBody: formData.get("body") }),
		},
	)

	if (!response.ok) {
		const { message } = await response.json()
		return { message }
	}

	const updatedPost = (await response.json()) as Post

	return {
		comments: updatedPost.comments,
	}
}

const CommentForm = ({ postId }: { postId: string }) => {
	const fetcher = useFetcher({ key: "comment-form-" + postId })
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	if (fetcher.data && textAreaRef.current) {
		textAreaRef.current.value = ""
	}

	return (
		<div>
			<h3 className="">Leave a comment</h3>
			<fetcher.Form method="post" action={`/posts/${postId}/comments`}>
				<div>
					<textarea
						className=""
						ref={textAreaRef}
						name="body"
						id="body"
						required
					></textarea>
				</div>
				<div>
					{auth.isSignedIn() && (
						<button className="" type="submit">
							Post a comment
						</button>
					)}
					{!auth.isSignedIn() && (
						<Link to="/sign-in">
							<button className="">
								Sign in to comment
							</button>
						</Link>
					)}
				</div>
			</fetcher.Form>
		</div>
	)
}

export default CommentForm