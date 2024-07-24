import { TrackType } from "@/types";
import styles from "./PlayerTrackPlay.module.css";
import classNames from "classnames";
import { useState } from "react";
import { setDislike, setLike } from "@/api/tracks";
import { useAppSelector } from "@/hooks";
import { useLikeTrack } from "@/hooks/useLikeTrack";

type TrackPlayType = {
  track: TrackType;
};

export default function PlayerTrackPlay({ track }: TrackPlayType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { isLiked, handleLike } = useLikeTrack(currentTrack);
  const token = useAppSelector((state) => state.auth.tokens);

  const user = useAppSelector((state) => state.auth.user);
  

  
  return (
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <span className={styles.trackPlayAuthorLink}>{track.name}</span>
        </div>
        <div className={styles.trackPlayAlbum}>
          <span className={styles.trackPlayAlbumLink}>{track.author}</span>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        
        <div onClick={handleLike} className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
          <svg className={styles.trackPlayDislikeSvg}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                !isLiked ? "icon-dislike" : "icon-like"
              }`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
