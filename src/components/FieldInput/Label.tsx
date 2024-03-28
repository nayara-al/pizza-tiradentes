import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export default function Label({ label, ...props }: LabelProps) {
  return (
    <label {...props} htmlFor={label}>
      {props.children}
    </label>
  );
}
