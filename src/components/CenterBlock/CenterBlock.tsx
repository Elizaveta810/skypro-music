"use client";
import styles from "./CentarBlock.module.css";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";
import Playlist from "../Playlist/Playlist";
import { TrackType } from "@/types";
import { useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";

export default function CenterBlock({
  tracks,
   title,
}: {
  tracks: TrackType[];
  playlist: TrackType[];
  title: string;
}) {
  const filteredTrack = useAppSelector((el) => el.playlist.filteredTracks);
  const searchValue = useAppSelector((el) => el.playlist.searchValue);

  const [newTrackData, setNewTrackData] = useState<TrackType[]>(tracks);

  useEffect(() => {
    // Проверяем, если searchValue пустое, используем исходные tracks
    if (searchValue.trim() === "") {
      setNewTrackData(tracks);
    } else {
      setNewTrackData(filteredTrack);
    }
    console.log("searchValue:", searchValue, "searchValue length:", searchValue.length);
    console.log("filteredTrack:", filteredTrack, "+++++++", "tracks:", tracks);
  }, [filteredTrack, searchValue, tracks]);

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>{title}</h2>
      <Filters />
      <Playlist tracks={newTrackData} playlist={newTrackData} />
    </div>
  );
}