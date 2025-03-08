import CustomizedFormButton from "../components/CustomizedFormButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addCommentSchema } from "../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router";
import Pagination from "../components/Pagination";

type Schema = z.infer<typeof addCommentSchema>;

const CommentSection = () => {
  const { id } = useParams();

  const COMMENT_PER_PAGE = 3;

  const [searchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get("page")) || 1;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Schema>({
    resolver: zodResolver(addCommentSchema)
  });

  const [currentPostComments, setCurrentPostComments] = useState<
    {
      _id: string;
      comment: string;
      user: { name: string; email: string; _id: string };
    }[]
  >([]);

  const [invalidateTags, setInvalidateTags] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [commentsNumber, setCommentsNumber] = useState<number>(0);

  useEffect(() => {
    async function getComments() {
      const baseUrl = import.meta.env.VITE_DATABASE_URL;

      setIsLoading(true);

      const response = await axios.get(
        baseUrl + `comments/${id}?limit=${COMMENT_PER_PAGE}&page=${pageNumber}`
      );

      setIsLoading(false);

      const serverPost = response.data;

      console.log(serverPost.commentsCount);

      setCommentsNumber(serverPost.commentsCount);

      setCurrentPostComments(serverPost.comments);
    }

    getComments();
  }, [id, invalidateTags, pageNumber]);

  async function onSubmit(data: Schema) {
    const baseUrl = import.meta.env.VITE_DATABASE_URL;

    const userToken = Cookies.get("userToken");

    try {
      await axios({
        url: baseUrl + "comments",
        method: "POST",
        data: { ...data, post: id },
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      setInvalidateTags((prev) => prev + 1);

      reset();
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading)
    return (
      <div className="max-w-[1000px] m-auto py-8 flex justify-between">
        <h2>Loading..............</h2>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-6 mb-5">
        <h2 className="text-white bg-black rounded-md p-2 text-center inline-block mb-5">
          Comments Section
        </h2>
        {currentPostComments.length > 0 ? (
          <ul className="flex flex-col gap-4 mb-5">
            {currentPostComments.map((comment) => (
              <li
                key={comment._id}
                className="bg-gray-100 p-2 rounded-md text-sm flex flex-col gap-2"
              >
                <h2>Created By : {comment.user.name}</h2>
                <h2>{comment.comment}</h2>
              </li>
            ))}
          </ul>
        ) : (
          "No Comments yet "
        )}
        <Pagination
          itemsNumber={commentsNumber}
          itemsPerPage={COMMENT_PER_PAGE}
        />
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("comment", { required: true })}
          placeholder="write your comment here"
          rows={3}
          className="w-full border-1 p-2 rounded-md text-sm outline-none"
        />
        <p className="text-red-500 font-semibold  text-[0.7rem]">
          {errors["comment"]?.message}
        </p>
        <div>
          <CustomizedFormButton
            disabled={isSubmitting}
            size="small"
            type="submit"
          >
            {isSubmitting ? "Submitting" : "Add Comment"}
          </CustomizedFormButton>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
