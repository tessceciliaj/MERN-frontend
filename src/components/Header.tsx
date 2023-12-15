import { Link, useFetcher } from 'react-router-dom';
import auth from '../lib/auth';


const Header = () => {
  const isAuthenticated = auth.isSignedIn()
  const fetcher = useFetcher()

  return (
    <div className='flex justify-between w-full items-center p-4'>
    <h1 className='font-semibold'>PageTitle</h1>
    <div>
      {isAuthenticated ?  
        <>
        <Link to="/create-post">
          <button>New Post</button>
        </Link>
          <fetcher.Form method='post' action='/sign-out'>
            <button type='submit'>Sign out</button>
          </fetcher.Form>
        </>
        :
        <>
          <Link to="/sign-up" className='pr-4'>
              <button>Sign up</button>
          </Link>
          <Link to="/sign-in">
              <button>Sign in</button>
          </Link>
        </>
      }
    </div>
</div>
  )
}

export default Header
