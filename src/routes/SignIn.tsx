import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom'
import auth from '../lib/auth';

 export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'login', {
    headers: {
      'Content-Type': 'application/json'
    }, 
    method: 'POST',
    body: JSON.stringify({username, password})
  })

  if(!response.ok) {
    const { message } = await response.json()

    return { message }
  }

  const { token } = await response.json()
  auth.signIn(token)

  return redirect('/')
 }

const SignIn = () => {
  const error = useActionData() as { message: string } | undefined;

  return (
    <div>
        <h2 className='text-lg py-4'>Welcome to NameOfPage </h2>
      <Form method="post" className='flex flex-col justify-center items-center gap-4'>
        {error &&  <p><b>Error:</b> {error.message}</p>}
        <div className='flex gap-4'>
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username' id='username' required></input>
        </div>
        <div className='flex gap-4'>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' id='password' required></input>
        </div>
        <button type='submit'>Sign In</button>
      </Form>
    </div>
  )
}

export default SignIn
