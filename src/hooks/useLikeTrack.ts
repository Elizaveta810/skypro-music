import { setDislike, setLike } from "@/api/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { dislike, likeTrack } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";

export function useLikeTrack(track: TrackType) {
  const dispatch = useAppDispatch();
  
  const tokens = useAppSelector((state) => state.auth.userData);
  const likedTrack = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked = likedTrack.find((t) => t.id === track.id);

  async function handleLike(event:React.MouseEvent) {
   event.stopPropagation()
   
   if (!tokens.access || !tokens.refresh) {
    return alert ("Вы не авторизованы!")
   }

   const action = isLiked ? setDislike : setLike
   try {
    await action (tokens.access, track.id)
   isLiked ? dispatch(dislike(track)) : dispatch(likeTrack(track))
    
   } catch (error) {
    console.log ("error.message")
    
   }
   
  }

  return {
    isLiked,
    handleLike,
  }
}
