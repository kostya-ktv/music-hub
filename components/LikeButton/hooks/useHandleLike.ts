import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface UseHandleLikeProps {
    userID?: string
    songID: string
    isLiked: boolean
    setIsLiked: (liked: boolean) => void
}
const useHandleLike = (payload: UseHandleLikeProps) => {
  const {isLiked, setIsLiked, userID, songID } = payload
  const router = useRouter();
  const authModal = useAuthModal()

  const { supabaseClient } = useSessionContext();

  return async () => {
      
    if (!userID) return authModal.onOpen();
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", userID)
        .eq("song_id", songID);
      error ? toast.error(error.message) : setIsLiked(false);
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songID,
        user_id: userID,
      });
      if (error) toast.error(error.message);
      else {
        toast.success("Liked!");
        setIsLiked(true);
      }
    }
    router.refresh();
  };
}
export default useHandleLike