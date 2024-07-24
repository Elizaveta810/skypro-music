import { setDislike, setLike } from "@/api/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { dislike, likeTrack } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";

export function useLikeTrack(track: TrackType) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const tokens = useAppSelector((state) => state.auth.tokens);
  const likedTrack = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked = likedTrack.find((t) => t._id === track._id);

  async function handleLike(event:React.MouseEvent) {
   event.stopPropagation()
   
   if (!tokens.access || !tokens.refresh) {
    return alert ("Вы не авторизованы!")
   }

   const action = isLiked ? setDislike : setLike
   try {
    await action (tokens.access, track._id)
   isLiked ? dispatch(dislike(track)) : dispatch(likeTrack(track))
    
   } catch (error) {
    console.log (error.message)
    
   }
   
  }

  return {
    isLiked,
    handleLike,
  }
}
