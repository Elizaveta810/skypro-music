"use client";
import styles from "./CentarBlock.module.css";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";
import Playlist from "../Playlist/Playlist";
import { TrackType } from "@/types";
import { useAppDispatch } from "@/hooks";


export default function CenterBlock({
  tracks,
 
  title,
}: {
  tracks: TrackType[];
  playlist: TrackType[];
  title: string;
}) {



  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>{title}</h2>
      <Filters />
      <Playlist tracks={tracks} playlist={tracks}  />
    </div>
  );
}
