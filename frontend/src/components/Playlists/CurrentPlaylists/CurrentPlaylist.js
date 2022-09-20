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
  }, [dispatch])

  if (!playlists) return null; //add loading page

  return (
    <ul id="curr-playlist-container">
      {Object.values(playlists).map((playlist) => {
        return (
          <li id="list-ele" key={playlist.id}>
            
          </li>
        )
      })}
    </ul>

  )
}
