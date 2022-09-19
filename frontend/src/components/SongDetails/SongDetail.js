import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
import React, { useEffect } from "react";
import "./SongDetail.css";
export default function SongDetails() {

  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => state.song);
  console.log("THISISSONG",song)
  useEffect(() => {

    dispatch(getSongDeets(songId));
  }, []);

  // const sessionUser = useSelector(state=> state.session.user)
  // if(!sessionUser) {
  //   // TODO ADD CSS
  // }

  return (
    <div>
      <div id="container-div">
        <div>
          <img id="preview"
          src={
            song.previewImage!==null && song.previewImage!==""
            ? song.previewImage
            : "https://i.imgur.com/QwtY70m.jpg"
          }
          alt="404"
          ></img>
        </div>

          <h1>{song.title}</h1>
          <h3>By: {song.userId}</h3>
          <h4>Album: {song.albumId!==(null||"")
          ? song.albumId
          : "Not asssociated to an album"
          }</h4>
          <h4>Description: {song.description}</h4>
          <h4>
            Date Uploaded:{"   "}{song.createdAt}{"  "}
            {
              // song.createdAt.toDateString()
              // song.createdAt.split("T")[0].split("-")[1] +
              //   "/" +
              //   song.createdAt.split("T")[0].split("-")[2] +
              //   "/" +
              //   song.createdAt.split("T")[0].split("-")[0]
              // type of check shows createdAt is a string
              // but .split still returns undefined
            }
          </h4>
      </div>
    </div>
  );
}
