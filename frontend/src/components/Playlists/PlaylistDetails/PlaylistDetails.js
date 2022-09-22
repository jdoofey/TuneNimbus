import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePlaylist } from "../../../store/playlist";
import React, { useEffect } from "react";
import "./PlaylistDetails.css";
export default function PlaylistDetails({setAudioUrl}) {
  const dispatch = useDispatch();
  const { playlistId } = useParams();

  const playlist = useSelector((state) => state.playlists);

  // console.log(playlist.Songs);
  useEffect(() => {
    dispatch(getOnePlaylist(playlistId));
  }, [playlistId, dispatch]);

  return (
    <div id="playlist-details-master-container">
      <h1>{playlist.name}</h1>
      {playlist?.Songs?.map((song, i) => {
        return (
          <div id="song-container">

            <img src={song.previewImage} width="50"></img>
            <div className="playlist-details-spacer"></div>
            <h3>{i+1}</h3>
            <div className="playlist-details-spacer"></div>
            <h3>{song.title}</h3>
            <div className="playlist-details-spacer"></div>
            <button onClick={e=>{
              e.preventDefault()
              setAudioUrl(song.url)
            }}>Play</button>

          </div>
        );
      })}
    </div>
  );
}
