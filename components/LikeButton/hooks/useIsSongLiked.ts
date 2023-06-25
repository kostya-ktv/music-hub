import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const useIsSongLiked = (userId: string | undefined, songId: string) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { supabaseClient } = useSessionContext();
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
    
    useEffect(() => {
        if (!userId) return;
        const fetch = async () => {
        const { data, error } = await supabaseClient
            .from("liked_songs")
            .select("*")
            .eq("user_id", userId)
            .eq("song_id", songId)
            .single();

        if (!error && data) setIsLiked(true);
        };
        fetch();
    }, [userId, supabaseClient]);
    

    return {isLiked, setIsLiked, Icon}
}
export default useIsSongLiked