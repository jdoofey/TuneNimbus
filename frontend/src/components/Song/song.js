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
        ></img>
        <div id="title">{song.song.title}</div>
      </div>
      {/* <audio id="player"controls src=""></audio> */}
    </Link>
  );
}

export default Song;
