import { Link } from "react-router-dom";
import "./Song.css";

function Song(song) {
  return (
    <Link to={`/songs/${song.song.id}/details`}>
      <div id="test">
        <img
          id="placeholder-img"
          src={
            song.song.previewImage !== (null || "")
            ? song.song.previewImage
            : "https://i.imgur.com/QwtY70m.jpg"
          }
          alt="404"
        ></img>
        <div id="title">{song.song.title}</div>
      </div>
    </Link>
  );
}

export default Song;
