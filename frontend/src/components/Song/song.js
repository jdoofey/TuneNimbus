import { NavLink } from "react-router-dom";
import "./Song.css";
import { useSelector } from "react-redux";
function Song(song) {
  // console.log(song.song.url)
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return (
      <NavLink
        to={`/songs/${song.song.id}`}
        // style={isActive => ({
        //   color: isActive ? "black" : "black"
        // })}
        style={{ textDecoration: "none", color: "black" }}
        activeStyle={(isActive) => ({
          color: isActive ? "black" : "black",
        })}
      >
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
      </NavLink>
    );
  }
  else return (
    <NavLink
        to={`/login`}
        //TODO make a please sign in or create an account
        // style={isActive => ({
        //   color: isActive ? "black" : "black"
        // })}
        style={{ textDecoration: "none", color: "black" }}
        activeStyle={(isActive) => ({
          color: isActive ? "black" : "black",
        })}
      >
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
      </NavLink>
  )
}
  // else {
  //   return (
  //     <div id="test">
  //         <img
  //           id="placeholder-img"
  //           src={
  //             song.song.previewImage !== (null || "")
  //               ? song.song.previewImage
  //               : "https://i.imgur.com/QwtY70m.jpg"
  //           }
  //         ></img>
  //         <div id="title">{song.song.title}</div>
  //       </div>
  //   )
  // }
// }

export default Song;
