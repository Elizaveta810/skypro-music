"use client";

import getTracks from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";

import { useEffect, useState } from "react";

export default function MainTrackPage() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  //Получаем данные трека

  useEffect(() => {
    const FetchTacks = async () => {
      try {
        const data = await getTracks().then((data) => {
          setTracks(data);
          dispatch(setInitialTracks({initialTracks:data}));
        });
      } catch {
        console.log("error");
      }
    };
    FetchTacks();
  }, [dispatch]);

  return (
    <CenterBlock tracks={filteredTracks} playlist={tracks} title="Треки" />
  );
}
