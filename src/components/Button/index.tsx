import React, { type ButtonHTMLAttributes } from "react";

import buildClassName from "../../helpers/buildClassName";

import "./style.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  className?: string;
}

const Button = (props: IButtonProps) => {
  const { children, className, ...otherProps } = props;
  return (
    <button {...otherProps} className={buildClassName("button", className)}>
      {children}
    </button>
  );
};

export default Button;
