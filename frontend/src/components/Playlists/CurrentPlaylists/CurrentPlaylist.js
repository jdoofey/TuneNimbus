import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsByCurrentUser,
         resetPLaylists } from "../../../store/playlist";
import Playlist from "../SinglePlaylist/SinglePlaylist";

export const CurrentPlaylists = () => {
  const dispatch = useDispatch()
  const playlists = useSelector((state)=> state.playlist.allPlaylists)

  useEffect(() => {
    dispatch(getPlaylistsByCurrentUser())
    return () => dispatch(resetPLaylists())
  })
}
