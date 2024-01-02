import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { useRef } from "react";
import auth from "../lib/auth";
import { Post } from "../types";

export const action = async (args: ActionFunctionArgs) => {
    const { postId } = args.params;
    const formData = await args.request.formData();

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + postId +'/comments', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        method: 'POST',
        body: JSON.stringify({ commentBody: formData.get('body') })
    });

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    const post = await response.json() as Post;

    return {
        comments: post.comments
    }
}

const CommentForm = ({ postId }: { postId: string }) => {
    const fetcher = useFetcher({ key: 'comment-form-' + postId })
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    if (fetcher.data && textareaRef.current) {
        textareaRef.current.value = '';
    }

    return (
        <div className="m-4 flex flex-col gap-4">
            <h3>Leave a comment</h3>
            <fetcher.Form method="post" action={`/posts/${postId}/comments`}>
                <div>
                    <textarea ref={textareaRef} name="body" id="body" required></textarea>
                </div>
                <div>
                    <button type="submit">Post comment</button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default CommentForm;