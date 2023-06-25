"use client";

import { useUser } from "@/hooks/useUser";

import useIsSongLiked from "./hooks/useIsSongLiked";
import useHandleLike from "./hooks/useHandleLike";

interface Props {
  songId: string;
}

const LikeButton: React.FC<Props> = ({ songId }) => {
  const { user } = useUser();
  const { Icon, isLiked, setIsLiked } = useIsSongLiked(user?.id, songId);

  const handleLike = useHandleLike({
    isLiked,
    setIsLiked,
    songID: songId,
    userID: user?.id,
  });
  return (
    <button
      onClick={handleLike}
      className="
    hover:opacity-75 transition"
    >
      <Icon color={isLiked ? "#c443d0" : "white"} />
    </button>
  );
};

export default LikeButton;
