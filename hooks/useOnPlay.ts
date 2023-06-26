import { Song } from "@/types";
import usePlayer from "../components/Player/hooks/usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer()

    const authModal = useAuthModal()
    const { user } = useUser()

    return (id: string) => {
        if (!user) {
            return authModal.onOpen()
        }

        player.setId(id)
        player.setIds(songs.map(song => song.id))
    }
}
export default useOnPlay

