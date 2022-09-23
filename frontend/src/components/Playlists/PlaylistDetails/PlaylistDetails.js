import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePlaylist } from "../../../store/playlist";
import React, { useEffect } from "react";
import { removePlaylist } from "../../../store/playlist";
import { useHistory } from "react-router-dom";
import "./PlaylistDetails.css";
export default function PlaylistDetails({ setAudioUrl }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { playlistId } = useParams();

  const playlist = useSelector((state) => state.playlists[playlistId]);

  // console.log(playlist.Songs);
  useEffect(() => {
    dispatch(getOnePlaylist(playlistId));
  }, [playlistId, dispatch]);
  const handleRemove = async e => {
    e.preventDefault();
    dispatch(removePlaylist(playlist.id))
    history.push("/playlists/current")
  }
  if(!playlist) return null
  return (
    <div id="playlist-details-master-container">
      <h1>{playlist.name}</h1>
      <br></br>
      {playlist?.Songs?.map((song, i) => {
        return (
          <div>
            <div id="song-container">
              <img src={song.previewImage} width="50"></img>
              <div className="playlist-details-spacer"></div>
              <h3>{i + 1}</h3>
              <div className="playlist-details-spacer"></div>
              <h3>{song.title}</h3>
              <div className="playlist-details-spacer"></div>
              <button className="playlist-audio-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setAudioUrl(song.url);
                }}
              >

              </button>
            </div>
          </div>
        );
      })}
      <button type="button" onClick={handleRemove}>Delete Playlist</button>
    </div>
  );
}
