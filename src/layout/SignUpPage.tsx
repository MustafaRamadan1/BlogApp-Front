import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomizedFormButton from "../components/CustomizedFormButton";
import CustomizedInput from "../components/CustomizedInput";
import { CurrentPage } from "../enums/enums";
import { signUpSchema } from "../schemas/schemas";

type Schema = z.infer<typeof signUpSchema>;

const SignUpPage = ({
  setCurrentPage
}: {
  setCurrentPage: (currentPage: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Schema>({
    resolver: zodResolver(signUpSchema)
  });

  async function onSubmit(signUpData: Schema) {
    const baseUrl = import.meta.env.VITE_DATABASE_URL;

    try {
      await axios({
        url: baseUrl + "auth/signup",
        method: "POST",
        data: signUpData
      });

      reset();

      setCurrentPage(CurrentPage.LOGIN);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full flex flex-col column gap-4`}
    >
      <h2 className="text-black font-bold text-2xl">Please Sign Up</h2>
      <div className="flex flex-col gap-5">
        <CustomizedInput
          register={{ ...register("name") }}
          widthValue="medium"
          type="text"
          placeholder="please enter your name"
          errorMessage={errors["name"]?.message}
        />
        <CustomizedInput
          register={{ ...register("email") }}
          widthValue="medium"
          type="text"
          placeholder="please enter valid email address"
          errorMessage={errors["email"]?.message}
        />
        <CustomizedInput
          register={{ ...register("password") }}
          widthValue="medium"
          type="password"
          placeholder="Password"
          errorMessage={errors["password"]?.message}
        />
        <CustomizedInput
          register={{ ...register("confirmPassword") }}
          widthValue="medium"
          type="password"
          placeholder="confirm your password"
          errorMessage={errors["confirmPassword"]?.message}
        />
        <div>
          <button
            onClick={() => setCurrentPage(CurrentPage.LOGIN)}
            type="button"
            className="inline-flex cursor-pointer text-sm"
          >
            Already have an account ?
          </button>
        </div>
      </div>
      <div>
        <CustomizedFormButton size="small" type="submit">
          {isSubmitting ? "Submitting" : "Sing Up"}
        </CustomizedFormButton>
      </div>
    </form>
  );
};

export default SignUpPage;
