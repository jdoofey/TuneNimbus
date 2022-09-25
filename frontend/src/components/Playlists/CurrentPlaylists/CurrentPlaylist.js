import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaylistsByCurrentUser,
  resetPLaylists,
} from "../../../store/playlist";
import { NavLink } from "react-router-dom";
import SinglePlaylist from "../SinglePlaylist/SinglePlaylist";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import "./CurrentPlaylist.css";
export const CurrentPlaylists = () => {
  const dispatch = useDispatch();

  const playlists = useSelector((state) => state.playlists);

  useEffect(() => {
    dispatch(getPlaylistsByCurrentUser());
    // return () => dispatch(resetPLaylists())
  }, [dispatch]);
 
  if (!Object.values(playlists).length)
    return (
      <div style={{display:"flex",
      flexDirection:"column",
      alignItems:"center"}}>
        <br></br>
        <br></br>
        <br></br>

        <h2>You haven't created a playlist yet</h2>
        <div id="createplaylistbtn">
          <br></br>
          <CreatePlaylist />
        </div>
      </div>
    );
  return (
    <div id="your-playlist-master-container">
      <div className="playlist-header-box-container">
        <h1>Your Playlists</h1>
        <div id="createplaylistbtn">
          <CreatePlaylist />
        </div>
      </div>

      <ul id="curr-playlist-container">
        {Object.values(playlists).map((playlist) => {
          return (
            <li id="list-ele" key={playlist.id}>
              <SinglePlaylist playlist={playlist} />
              <div>{playlist.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
