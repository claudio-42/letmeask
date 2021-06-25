import { ButtonHTMLAttributes } from "react";

import "../../components/Button/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="button" {...props}></button>;
}
