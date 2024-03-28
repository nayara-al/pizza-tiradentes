import { ButtonHTMLAttributes } from "react";
import style from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export default function Button({ ...props }: ButtonProps) {
  return (
    <button {...props} className={style.btn}>
      {props.children}
    </button>
  );
}
