"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import AuthButtons from "./AuthButtons";
import NavButtons from "./NabButtons";

interface Props extends React.PropsWithChildren {
  className?: string;
}
const Header: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `
  h-fit
  bg-gradient-to-b
  from-purple-900
  p-6
    `,
        className
      )}
    >
      <div
        className="
          
          w-full
          mb-4
          flex
          items-center
          justify-between"
      >
        <NavButtons />
        <AuthButtons />
      </div>
      {children}
    </div>
  );
};
export default Header;
