import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom"
import { ActionData } from "../types"
import auth from "../lib/auth"

export const action = async ({ request }: ActionFunctionArgs) => {
      // Hämtar ut allt som matas in i formuläret,
    const formData = await request.formData()
   // Hämtar ut nyckelvärden och gör ett nytt objekt
    const postData = Object.fromEntries(formData.entries())

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getJWT()}`
        }, 
        body: JSON.stringify(postData),
    })

    if (!response.ok) {
        const { message } = await response.json();
        return ( message )
    }

    return redirect('/')
}

const CreatePost = () => {
    const error = useActionData() as ActionData

  return (
    <div className="p-4">
    <h2 className='text-lg py-4'>Create Post</h2>
  <Form method="post" className='flex flex-col justify-center items-center gap-4 w-full p-4 border-2 border-white'>
    {error &&  <p className="text-white"><b>Error:</b> {error.message}</p>}
    <div className='flex gap-4'>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' id='title' required></input>
    </div>
    <div className='flex gap-4'>
        <label htmlFor='link'>Link:</label>
        <input type='link' name='link' id='link' />
    </div>
    <div className='flex gap-4'>
        <label htmlFor='body'>Body:</label>
        <textarea  name='body' id='body' required></textarea>
    </div>
    <button type='submit'>Create Post</button>
  </Form>
</div>
  )
}

export default CreatePost
