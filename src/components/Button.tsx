//import todas as propriedades do button no html
import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  //passando propriedades do button (onclick etc...)
  return <button className="button" {...props} />;
}
