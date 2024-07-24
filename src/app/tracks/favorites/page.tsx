"use client";

import { getFavoritesTracks, getPlaylistTracks, getToken } from "@/api/tracks";
import Playlist from "@/components/Playlist/Playlist";
import { useAppSelector } from "@/hooks";
import { useUser } from "@/hooks/useUser";
import { getValueFromLocalStorage } from "@/lib/getValueFromLs";
import { TrackType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  // const [tracksData, setTracksData] = useState<TrackType[]>([]);
  const { logout } = useUser();
  const router = useRouter();
  const likedTrack = useAppSelector((state) => state.playlist.likedTracks);
  // useEffect(() => {
  //   const token = getValueFromLocalStorage("token");
  //   getFavoritesTracks(token?.access)
  //     .then((data) => {
  //       setTracksData(data);
  //     })
  //     .catch((error) => {
  //       if (error.message === "401") {
  //         logout();
  //         router.push("/signin");
  //       } else {
  //         alert(error.message);
  //       }
  //     });
  // }, [logout, router]);
  return (
    <>
      <Playlist tracks={likedTrack} playlist={likedTrack} isFavorite={true} />
    </>
  );
}
