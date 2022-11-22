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
      {!playlist?.Songs?.length && <div>
        <h3>You haven't added any songs to this playlist yet</h3>
        </div>}
      {playlist?.Songs?.map((song, i) => {
        return (
          <div>
            <div id="song-container">
              <img src={song.previewImage} width="70" height="70"></img>
              <button style={{position:"static",
              marginLeft:"-55px",
              marginTop:"13px"}}className="playlist-audio-btn" id="playlistdetail"
                onClick={(e) => {
                  e.preventDefault();
                  setAudioUrl(song.url);
                }}
              ></button>
              <div className="playlist-details-spacer"></div>
              <h3>{i + 1}</h3>
              <div className="playlist-details-spacer"></div>
              <h3>{song.title}</h3>
              <div className="playlist-details-spacer"></div>

            </div>
          </div>
        );
      })}
      <button style={{
                      cursor: "pointer",
                      backgroundColor: "#ff652d",
                      color: "white",
                      border: "none",
                      height: "fit-content",
                      padding: "10px 15px",
                      borderRadius: "4px",
                      alignSelf: "center",
                      fontSize: "14px",
                      marginTop: "50px",
                    }}
      onClick={handleRemove}>Delete Playlist</button>
    </div>
  );
}
