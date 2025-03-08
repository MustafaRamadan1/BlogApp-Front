import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface CustomizedInputInterface {
  value?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  widthValue: "large" | "medium" | "small";
  register?: UseFormRegisterReturn;
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}
