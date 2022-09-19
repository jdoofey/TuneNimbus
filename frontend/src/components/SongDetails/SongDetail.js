import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
import React, { useEffect } from "react";
import "./SongDetail.css";
export default function SongDetails() {

  const dispatch = useDispatch();
  const { songId } = useParams();
  console.log("use params", songId)
  const songState = useSelector((state) => state.song);
  console.log("THIS IS SONG STATE", songState);
  
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
            songState[songId].previewImage!==null && songState[songId].previewImage!==""
            ? songState[songId].previewImage
            : "https://i.imgur.com/QwtY70m.jpg"
          }
          alt="404"
          ></img>
        </div>

          <h1>{songState[songId].title}</h1>
          <h3>By: {songState[songId].userId}</h3>
          <h4>Album: {songState[songId].albumId!==(null||"")
          ? songState[songId].albumId
          : "Not asssociated to an album"
          }</h4>
          <h4>Description: {songState[songId].description}</h4>
          <h4>
            Date Uploaded:{" "}
            {
              //songState[songId].createdAt.toDateString() DATESTRING NOT WORKING
              songState[songId].createdAt.split("T")[0].split("-")[1] +
                "/" +
                songState[songId].createdAt.split("T")[0].split("-")[2] +
                "/" +
                songState[songId].createdAt.split("T")[0].split("-")[0]
            }
          </h4>
      </div>
    </div>
  );
}
