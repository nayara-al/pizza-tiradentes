import style from "./Input.module.css";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export default function Input({ label, ...props }: InputProps) {
  return <input {...props} id={label} className={style.input} />;
}
