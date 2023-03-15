import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditSongForm from "../EditSongForm/EditSongForm";
import { getSongDeets } from "../../store/songs";
import React, { useEffect, useState } from "react";
import Comments from "../Comments/comments";
import * as moment from 'moment';
import "./SongDetail.css";

export default function SongDetails({ setAudioUrl }) {

  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => state.song.singleSong);

  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {

    dispatch(getSongDeets(songId))
    .then(()=> setIsLoaded(true))
  }, [songId, dispatch]);

  const sessionUser = useSelector(state => state.session.user)
  // if(!sessionUser) {
  //   // TODO ADD CSS
  // }

  return isLoaded && (
    <>
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
              <div>
              {song?.Album!== null && (
              <div className="song-details-album-container">
                <img className="song-details-album-img" src={song.Album.previewImage === null ? "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" : song.Album.previewImage}/>
                <div className="song-details-album">{`In Album: ${song.Album.title}`}</div>
              </div>
              )}
              </div>
            </div>
          </div>
          <div id="song-details-date">
            <span>{moment(song.createdAt).fromNow()}</span>
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
        <div id="waveform">

        </div>
             {(sessionUser.username === song?.Artist?.username) && (
              <div id="edit-song-container">
                <EditSongForm song={song}/>
              </div>
             )}
      </div>
      <Comments />
    </>
  );
}

