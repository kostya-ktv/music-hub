"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import PlayButton from "./PlayButton";

interface Props {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<Props> = ({ href, image, name }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-100/10
            hover:bg-neutral-100/20
            transition
            pr-4
    "
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="img" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <PlayButton />
    </button>
  );
};
export default ListItem;
