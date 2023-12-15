import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Post } from "../types"
import PostListItem from "../components/PostListItem"

export const loader = async (args: LoaderFunctionArgs) => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
    headers: {
      'Accepts': 'application/json'
    }
  })


  return await response.json()

}


const Index = () => {
  const data = useLoaderData() as { posts: Post[], totalPages: number } | undefined

  return (
    <div>
      <h3 className="text-lg font-semibold">Welcome soldie!</h3>
      <div className="flex flex-wrap gap-4 justify-center p-4">
        {data?.posts.map((post) => <PostListItem post={post} key={post._id}/>)}
        <p>Pages {data?.totalPages}</p>
        </div>
    </div>
  )
}

export default Index
