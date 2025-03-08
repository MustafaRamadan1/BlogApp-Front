import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomizedFormButton from "../components/CustomizedFormButton";
import CustomizedInput from "../components/CustomizedInput";
import { signInFormSchema } from "../schemas/schemas";
import useUserStore from "../store/zustandStore";
import { CurrentPage } from "../enums/enums";
import { useNavigate } from "react-router";

type Schema = z.infer<typeof signInFormSchema>;

const LoginPage = ({
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
    resolver: zodResolver(signInFormSchema)
  });

  const navigate = useNavigate();

  const updateUser = useUserStore((state) => state.updateUser);

  async function onSubmit(loginData: Schema) {
    const baseUrl = import.meta.env.VITE_DATABASE_URL;

    try {
      const res = await axios({
        url: baseUrl + "auth/login",
        method: "POST",
        data: loginData
      });

      const {
        data: { name, email, token }
      } = res;

      updateUser({ name, email });

      localStorage.setItem("user", JSON.stringify({ name, email }));

      Cookies.set("userToken", token, {
        expires: 7
      });

      reset();

      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full flex flex-col column gap-4`}
    >
      <h2 className="text-black font-bold text-2xl">Please Log In</h2>
      <div className="flex flex-col gap-5">
        <CustomizedInput
          register={{ ...register("email") }}
          widthValue="medium"
          type="text"
          placeholder="user@example.com"
          errorMessage={errors["email"]?.message}
        />
        <CustomizedInput
          register={{ ...register("password") }}
          widthValue="medium"
          type="password"
          placeholder="Password"
          errorMessage={errors["password"]?.message}
        />
        <div>
          <button
            onClick={() => setCurrentPage(CurrentPage.SIGNUP)}
            type="button"
            className="inline cursor-pointer text-sm text-start "
          >
            Do not have an account ?
          </button>
        </div>
      </div>
      <div>
        <CustomizedFormButton
          disabled={isSubmitting}
          size="small"
          type="submit"
        >
          {isSubmitting ? "Submitting" : "Log In"}
        </CustomizedFormButton>
      </div>
    </form>
  );
};

export default LoginPage;
