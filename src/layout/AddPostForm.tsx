import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomizedInput from "../components/CustomizedInput";
import { addPostSchema } from "../schemas/schemas";
import CustomizedFormButton from "../components/CustomizedFormButton";

type Schema = z.infer<typeof addPostSchema>;

const AddPostForm = ({
  setInvalidateTags
}: {
  setInvalidateTags: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Schema>({
    resolver: zodResolver(addPostSchema)
  });

  async function onSubmit(data: Schema) {
    const baseUrl = import.meta.env.VITE_DATABASE_URL;

    const userToken = Cookies.get("userToken");

    try {
      await axios({
        url: baseUrl + "posts",
        method: "POST",
        data,
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

  return (
    <form
      className="p-5 w-full flex flex-col gap-5 text-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-bold bg-black p-2 text-white rounded-md">
        Add your Post
      </h2>
      <CustomizedInput
        register={{ ...register("title") }}
        widthValue="large"
        type="text"
        placeholder="Title"
        errorMessage={errors["title"]?.message}
      />
      <CustomizedInput
        register={{ ...register("content") }}
        widthValue="large"
        type="text"
        placeholder="content"
        errorMessage={errors["content"]?.message}
      />
      <div>
        <CustomizedFormButton
          disabled={isSubmitting}
          size="small"
          type="submit"
        >
          {isSubmitting ? "Submitting" : "Create Post"}
        </CustomizedFormButton>
      </div>
    </form>
  );
};

export default AddPostForm;
