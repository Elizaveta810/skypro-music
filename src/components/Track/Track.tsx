`use client`;

import { durationFormat } from "@/lib/durationFormat";
import styles from "./Track.module.css";
import { TrackType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playlistSlice";

import { useLikeTrack } from "@/hooks/useLikeTrack";

type PlaylistType = {
  track: TrackType;
  tracksData: TrackType[];
};

export default function Track({ track, tracksData }: PlaylistType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const { name, author, album, duration_in_seconds, id } = track;
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;
  const dispatch = useAppDispatch();
  const { isLiked, handleLike } = useLikeTrack(track);

  const HandleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
    dispatch(setIsPlaying(true));
  };
  console.log(currentTrack);
  return (
    <>
      {currentTrack === track ? (
        <div onClick={HandleTrackClick} className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <div className={styles.trackTitleImage}>
                {isPlaying ? (
                  <svg className={styles.trackActiveSvg}>
                    <use href="/img/icon/sprite.svg#icon-isplaying" />
                  </svg>
                ) : (
                  <svg className={styles.trackTitleSvg}>
                   <use href="/img/icon/sprite.svg#icon-isplaying" />
                  </svg>
                )}
              </div>
              <div className={styles.trackTitleText}>
                <span className={styles.trackTitleLink}>
                  {name} <span className={styles.trackTitleSpan} />
                </span>
              </div>
            </div>
            <div className={styles.trackAuthor}>
              <span className={styles.trackAuthorLink}>{author}</span>
            </div>
            <div className={styles.trackAlbum}>
              <span className={styles.trackAlbumLink}>{album}</span>
            </div>
            <div className={styles.trackTime}>
              <div onClick={handleLike}>
                {isLiked ? (
                  <svg className={styles.trackTimeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                  </svg>
                ) : (
                  <svg className={styles.trackTimeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                  </svg>
                )}
              </div>

              <span className={styles.trackTimeText}>
                {durationFormat(duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={HandleTrackClick} className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <div className={styles.trackTitleImage}>
                <svg className={styles.trackTitleSvg}>
                  <use href="/img/icon/sprite.svg#icon-note" />
                </svg>
              </div>
              <div className={styles.trackTitleText}>
                <span className={styles.trackTitleLink}>
                  {name} <span className={styles.trackTitleSpan} />
                </span>
              </div>
            </div>
            <div className={styles.trackAuthor}>
              <span className={styles.trackAuthorLink}>{author}</span>
            </div>
            <div className={styles.trackAlbum}>
              <span className={styles.trackAlbumLink}>{album}</span>
            </div>
            <div className={styles.trackTime}>
              <div onClick={handleLike}>
                {isLiked ? (
                  <svg className={styles.trackTimeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                  </svg>
                ) : (
                  <svg className={styles.trackTimeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                  </svg>
                )}
              </div>

              <span className={styles.trackTimeText}>
                {durationFormat(duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
