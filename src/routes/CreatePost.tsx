import { Form, useActionData } from "react-router-dom"
import { ActionData } from "../types"

const CreatePost = () => {
    const error = useActionData() as ActionData

  return (
    <div className="p-4">
    <h2 className='text-lg py-4'>Create Post</h2>
  <Form method="post" encType="multipart/form-data" className='flex flex-col justify-center items-center gap-4 w-full p-4 border-2 border-white'>
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
        <textarea  name='body' id='body'></textarea>
        <div>
          <label htmlFor="image">Image (optional)</label>
          <input type="file" name="image" accept="image/*"/>
        </div>
    </div>
    <button type='submit'>Create Post</button>
  </Form>
</div>
  )
}

export default CreatePost
