"use client";

import MediaItem from "@/components/Library/MediaItem";
import LikeButton from "@/components/LikeButton/LikeButton";
import { Song } from "@/types";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "../Slider/Slider";
import usePlayer from "../hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface Props {
  song: Song;
  songURL: string;
}
const PlayerContent: React.FC<Props> = ({ song, songURL }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length) {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const nextSong = player.ids[currentIndex + 1];
      if (!nextSong) return player.setId(player.ids[0]);
      player.setId(nextSong);
    }
  };
  const onPlayPrevious = () => {
    if (player.ids.length) {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const prevSong = player.ids[currentIndex - 1];
      if (!prevSong) return player.setId(player.ids[player.ids.length - 1]);
      player.setId(prevSong);
    }
  };

  const [play, { pause, sound }] = useSound(songURL, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(true);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => sound?.unload();
  }, []);

  const handlePlay = () => (isPlaying ? pause() : play());
  const toggleMute = () => (volume != 0 ? setVolume(0) : setVolume(1));
  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        h-full"
    >
      <div
        className="
          flex
          w-full
          justify-start"
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div
        className="
          flex
          md:hidden
          w-full
          justify-end
          items-center"
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
              bg-white
              p-1
              cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div
        className="
          hidden
          h-full
          md:flex
          justify-center
          items-center
          w-full
          max-w-[722px]
          gap-x-6"
      >
        <AiFillStepBackward
          size={30}
          onClick={onPlayPrevious}
          className="
        text-neutral-400
        cursor-pointer
        hover:text-white
        transition"
        />
        <div
          onClick={handlePlay}
          className="
        flex
        items-center
        justify-center
        h-10
        w-10
        rounded-full
        bg-white
        p-1
        cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="text-neutral-400 
        transition
        hover:text-white
        cursor-pointer"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={34}
            onClick={toggleMute}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
