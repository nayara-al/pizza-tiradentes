import style from "./Input.module.css";
import { HTMLAttributes } from "react";

interface BaseInputProps extends HTMLAttributes<HTMLDivElement> {}

export default function BaseInput({ ...props }: BaseInputProps) {
  return (
    <div {...props} className={style.container}>
      {props.children}
    </div>
  );
}
