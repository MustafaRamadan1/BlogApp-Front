import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IPost } from "../interfaces/PostInterface";
import CommentSection from "./CommentSection";


const SinglePost = () => {
  const { id } = useParams();

  const [currentPost, setCurrentPost] = useState<IPost>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getPost() {
      const baseUrl = import.meta.env.VITE_DATABASE_URL;

      setIsLoading(true);

      const response = await axios.get(baseUrl + `posts/${id}`);

      const serverPost = response.data;

      setCurrentPost(serverPost);

      setIsLoading(false);
    }

    getPost();
  }, [id]);

  if (isLoading)
    return (
      <div className="max-w-[1000px] m-auto py-8 flex justify-between">
        <h2>Loading..............</h2>
      </div>
    );

  return (
    <div className="max-w-[1000px] m-auto py-8 flex flex-col gap-5 ">
      <div
        key={currentPost?._id}
        className="bg-gray-100 p-4 flex flex-col gap-4 shadow-sm rounded-md"
      >
        <div className="flex items-center justify-between">
          <h1>Author Name : {currentPost?.author.name}</h1>
        </div>
        <div className="flex flex-col gap-4">
          <h2> Title : {currentPost?.title}</h2>
          <h2> Content : {currentPost?.content}</h2>
        </div>
      </div>
      <CommentSection />
    </div>
  );
};

export default SinglePost;
