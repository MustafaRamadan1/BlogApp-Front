import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ErrorMessage from "./ErrorMessage";
import { CustomizedInputInterface } from "../interfaces/CustomizedInputInterface";

function customStyles(widthValue: string): { [key: string]: string } {
  const styles = {
    width: "100%"
  };

  switch (widthValue) {
    case "medium": {
      styles.width = "50%";
      break;
    }

    case "small": {
      styles.width = "25%";
      break;
    }
    default:
      return styles;
  }

  return styles;
}

const CustomizedInput = ({
  value,
  onchange,
  label,
  type = "text",
  placeholder,
  errorMessage,
  register,
  widthValue,
  defaultValue
}: CustomizedInputInterface) => {
  const [visibleContent, setVisibleContent] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-3">
        <label className="text-black text-[1.3rem]">{label}</label>

        <div style={{ ...customStyles(widthValue) }} className="relative">
          <input
            defaultValue={defaultValue}
            onChange={onchange}
            value={value}
            type={visibleContent ? "text" : type}
            placeholder={placeholder}
            className="px-2 py-2 border-slate-500  border-[0.8px] rounded-md w-full placeholder:text-slate-200 placeholder:text-sm outline-none text-sm "
            {...register}
          />
          {type === "password" && (
            <span
              onClick={() => setVisibleContent((prev) => !prev)}
              className="absolute top-3 right-3 text-md cursor-pointer text-slate-400 "
            >
              {visibleContent ? <HiEyeOff /> : <HiEye />}
            </span>
          )}
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CustomizedInput;
