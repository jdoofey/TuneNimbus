import { Link } from "react-router-dom";
import "./Song.css";

function Song(song) {
  // console.log(song.song.url)
  return (
    <Link to={`/songs/${song.song.id}`}>
      <div id="test">
        <img
          id="placeholder-img"
          src={
            song.song.previewImage !== (null || "")
            ? song.song.previewImage
            : "https://i.imgur.com/QwtY70m.jpg"
          }

        ></img>
        <div id="title">{song.song.title}</div>
        <div>{song.song.albumId}</div>
      </div>
    </Link>
  );
}

export default Song;
