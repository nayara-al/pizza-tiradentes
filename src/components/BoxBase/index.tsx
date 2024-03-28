import style from "./BoxBase.module.css"
import { HTMLAttributes } from "react";

interface BoxBaseProps extends HTMLAttributes<HTMLDivElement> {}

export default function BoxBase({...props}: BoxBaseProps) {
  return <div {...props} className={style.container}>{props.children}</div>;
}
