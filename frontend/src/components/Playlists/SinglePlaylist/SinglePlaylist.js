import { Link } from "react-router-dom";
import "./SinglePlaylist.css"

function SinglePlaylist(playlist) {

  return (
    <Link to={`/playlists/${playlist.playlist.id}`}>
      <div id="playlist-container">
        <img
          id="card-image"
          src={
            (playlist.playlist.previewImage === null || playlist.playlist.previewImage==="")
            ? "https://i.imgur.com/QwtY70m.jpg"
            : playlist.playlist.previewImage
          }
          alt="No Image found"
          ></img>
        <div id="playlist-title">{playlist.playlist.title}</div>

      </div>
    </Link>
  )
}

export default SinglePlaylist
