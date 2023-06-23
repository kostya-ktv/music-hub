import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        disabled={disabled}
        ref={ref}
        className={twMerge(
          `
    w-full
    rounded-full
    bg-green-500
    border
    border-transparent
    px-3
    text-black
    py-3
    disabled:cursor-not-allowed
    disabled:opacity-50
    font-bold
    hover:opacity-75
    transition`,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
