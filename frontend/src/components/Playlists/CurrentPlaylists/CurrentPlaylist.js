import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsByCurrentUser,
         resetPLaylists } from "../../../store/playlist";
import SinglePlaylist from "../SinglePlaylist/SinglePlaylist";
import "./CurrentPlaylist.css"
export const CurrentPlaylists = () => {
  const dispatch = useDispatch()
  const stateState = useSelector(state=> state)
  console.log("IS THIS WORKING", stateState)
  const playlists = useSelector((state)=> state.playlists.allPlaylists)

  useEffect(() => {
    dispatch(getPlaylistsByCurrentUser())
    return () => dispatch(resetPLaylists())
  }, [dispatch])
  console.log("current playlists spot", playlists)
  if (!playlists) return null; //add loading page

  return (
    <ul id="curr-playlist-container">
      {Object.values(playlists).map((playlist) => {
        return (
          <li id="list-ele" key={playlist.id}>
            <SinglePlaylist playlist={playlist} />
            <div>{playlist.name}</div>
          </li>
        )
      })}
    </ul>

  )
}
