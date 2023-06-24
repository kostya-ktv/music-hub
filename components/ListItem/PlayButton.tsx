"use client";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <div
      className="
        absolute
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        right-5
        group-hover:opacity-100
        hover:scale-110
      "
    >
      <FaPlay className="text-black" />
    </div>
  );
};
export default PlayButton;
