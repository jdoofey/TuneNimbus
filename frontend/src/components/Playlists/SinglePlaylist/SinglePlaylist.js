import { Link } from "react-router-dom";
import "./SinglePlaylist.css"
function SinglePlaylist(playlist) {
  console.log(playlist.playlist)
  return (
    <Link to={`/playlists/${playlist.playlist.id}`}>
      <div id="playlist-container">
        <img
          id="card-image"
          src={
            playlist.playlist.imageUrl === (null || "")
            ? playlist.playlist.imageUrl
            : "https://i.imgur.com/QwtY70m.jpg"
          }
          ></img>
        <div id="playlist-title">{playlist.playlist.title}</div>
      </div>
    </Link>
  )
}

export default SinglePlaylist
