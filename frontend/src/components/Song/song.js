import { NavLink } from "react-router-dom";
import "./Song.css";
import { useSelector } from "react-redux";
function Song(song) {

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return (
      <div id="test">
          <NavLink
            to={`/songs/${song.song.id}`}
            // style={isActive => ({
            //   color: isActive ? "black" : "black"
            // })}
            style={{ textDecoration: "none", color:"rgb(192, 192, 192)"}}
            activeStyle={(isActive) => ({
              color: isActive ? "black" : "black",
            })}
          >
          <img
            id="placeholder-img"
            src={
              song.song.previewImage !== (null || "")
                ? song.song.previewImage
                : "https://i.imgur.com/QwtY70m.jpg"
            }
          ></img>
          <div id="title-box">{song.song.title}</div>
      </NavLink>
        </div>
    );
  }
  else return (
    <NavLink
        to={`/`}

        style={{ textDecoration: "none", cursor:"default" }}
        // activeStyle={(isActive) => ({
        //   color: isActive ? "black" : "black",
        // })}
      >
        <div id="test" >
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
      </NavLink>
  )
}

export default Song;
