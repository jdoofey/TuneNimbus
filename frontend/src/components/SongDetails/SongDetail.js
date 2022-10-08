import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
import React, { useEffect } from "react";
import "./SongDetail.css";
import EditSongForm from "../EditSongForm/EditSongForm";
export default function SongDetails({ setAudioUrl }) {

  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => state.song);

  useEffect(() => {

    dispatch(getSongDeets(songId));
  }, [songId, dispatch]);

  const sessionUser = useSelector(state => state.session.user)
  // if(!sessionUser) {
  //   // TODO ADD CSS
  // }

  return (
    <div id="banner-container">
      <div id="banner-top">
        <div id="banner-top-left">
          <button
            id="song-details-play-button"
            onClick={(e) => {
              e.preventDefault();
              setAudioUrl(song.url);
            }}
          ></button>
          <div id="banner-song-details">
            <div id="song-details-title">{song.title}</div>
            <div id="song-details-artist">{song?.Artist?.username}</div>
          </div>
        </div>
      <div id="song-details-date">
        <span>{new Date(song.createdAt).toString().slice(4, 16)}</span>
      </div>
      </div>
      <img id="song-details-image"
        style={{
          width: "300px",
          height: "300px"
        }}
        src={
          song.previewImage !== null && song.previewImage !== ""
            ? song.previewImage
            : "https://i.imgur.com/QwtY70m.jpg"
        }
        alt="404"
      ></img>
    </div>
  );
}

//   <img id="preview"
//   style={{width:"300px",
//           height:"300px"
// }}
//   src={
//     song.previewImage!==null && song.previewImage!==""
//     ? song.previewImage
//     : "https://i.imgur.com/QwtY70m.jpg"
//   }
//   alt="404"
//   ></img>
// </div>

//   <h1>{song.title}</h1>
//   <h3>By: {song?.Artist?.username}</h3>
//   <h4>Album: {song?.Album?.title}</h4>
//   <h4>Description: {song.description}</h4>
//   <h4>
//     Date Uploaded:{"   "}{new Date(song.createdAt).toString().slice(4, 16)}{"  "}

//   </h4>
//   {(sessionUser.username === song?.Artist?.username) && (
//     <div id="edit-song-container">
//       <EditSongForm song={song}/>
