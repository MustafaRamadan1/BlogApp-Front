import axios from "axios";
import { useEffect, useState } from "react";
import AddPostForm from "./AddPostForm";
import { IPost } from "../interfaces/PostInterface";
import { HiEye } from "react-icons/hi";
import { Link, useSearchParams } from "react-router";
import Pagination from "../components/Pagination";

const BlogsPage = () => {
  const POST_PER_PAGE = 3;

  const [searchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get("page")) || 1;

  const [posts, setPosts] = useState<IPost[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPostForm, setShowPostForm] = useState<boolean>(false);

  const [invalidateTags, setInvalidateTags] = useState<number>(0);

  const [postsNumber, setPostsNumber] = useState<number>(0);

  useEffect(() => {
    async function getPosts() {
      const baseUrl = import.meta.env.VITE_DATABASE_URL;

      setIsLoading(true);

      const response = await axios.get(
        baseUrl + `posts?limit=${POST_PER_PAGE}&page=${pageNumber}`
      );

      setPostsNumber(response.data.postsCount);

      const serverPosts = response.data.posts;

      setPosts(serverPosts);

      setIsLoading(false);
    }

    getPosts();
  }, [invalidateTags, pageNumber]);

  if (isLoading)
    return (
      <div className="max-w-[1000px] m-auto py-8 flex justify-between">
        <h2>Loading..............</h2>
      </div>
    );

  return (
    <div className="max-w-[1100px] m-auto py-8 flex gap-5 justify-between">
      <div className="w-[80%] flex flex-col gap-4 ">
        {posts.length > 0 ? (
          <ul className=" flex flex-col gap-5">
            {posts.map((post) => (
              <li
                key={post._id}
                className="bg-gray-100 p-4 flex flex-col gap-4 shadow-sm rounded-md"
              >
                <div className="flex items-center justify-between">
                  <h1>Author Name : {post.author.name}</h1>
                  <Link to={`/posts/${post._id}`}>
                    <span aria-label="view">
                      <HiEye />
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <h2> Title : {post.title}</h2>
                  <h2> Content : {post.content}</h2>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-bold">Start adding posts</p>
        )}
        <Pagination itemsNumber={postsNumber} itemsPerPage={POST_PER_PAGE} />
      </div>
      <div className="flex flex-col gap-8 grow align-center">
        <button
          onClick={() => setShowPostForm((prev) => !prev)}
          type="button"
          className="cursor-pointer bg-yellow-400 p-2 rounded-lg"
        >
          Add Post
        </button>
        {showPostForm && <AddPostForm setInvalidateTags={setInvalidateTags} />}
      </div>
    </div>
  );
};

export default BlogsPage;
