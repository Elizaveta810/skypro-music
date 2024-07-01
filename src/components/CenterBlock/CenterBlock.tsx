"use client";
import styles from "./CentarBlock.module.css";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";
import Playlist from "../Playlist/Playlist";
import { TrackType } from "@/types";
import { getTracks } from "@/api/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export default function CenterBlock({
  tracks,
  playlist,
}: {
  tracks: TrackType[];
  playlist: TrackType[];
}) {
  const dispatch = useAppDispatch();
  // const [tracks, setTracks] = useState<TrackType[]>([]);
  // const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
  // // useEffect(() => {
  //   getTracks().then((tracksData) => {
  //     setTracks(tracksData);
  //     dispatch(setInitialTracks({ initialTracks: tracksData }));
  //   });
  // }, [dispatch]);

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters />
      <Playlist tracks={tracks} playlist={tracks} />
    </div>
  );
}
