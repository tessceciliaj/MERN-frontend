import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom'

 export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('password_confirmation')

  if(password !== passwordConfirmation) {
    return {message: 'Passwords are not the same'}
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/register', {
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

  return redirect('/sign-in')
 }

const SignUp = () => {
  const error = useActionData() as { message: string } | undefined;

  return (
    <div>
        <h2 className='text-lg py-4'>Create a new account</h2>
      <Form method="post" className='flex flex-col justify-center items-center gap-4'>
        {error &&  <p><b>Error:</b> {error.message}</p>}
        <div>
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username' id='username' required></input>
        </div>
        <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' name='password' id='password' required></input>
        </div>
        <div>
            <label htmlFor='password_confirmation'>Password Confirmation:</label>
            <input type='password' name='password_confirmation' id='password_confirmation' required></input>
        </div>
        <button type='submit'>Create user</button>
      </Form>
    </div>
  )
}

export default SignUp
