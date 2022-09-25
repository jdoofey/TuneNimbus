import { NavLink } from "react-router-dom";
import "./Song.css";
import { useSelector } from "react-redux";
function Song(song) {
  // console.log(song.song.url)
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return (
      <div id="test">
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
        //TODO make a please sign in or create an account
        // style={isActive => ({
        //   color: isActive ? "black" : "black"
        // })}
        style={{ textDecoration: "none", cursor:"default" }}
        // activeStyle={(isActive) => ({
        //   color: isActive ? "black" : "black",
        // })}
      >
        <div id="test" style={{backgroundColor:"white"}}>
          <img
            id="placeholder-img"
            src={
              song.song.previewImage !== (null || "")
                ? song.song.previewImage
                : "https://i.imgur.com/QwtY70m.jpg"
            }
          ></img>
          <div id="title" style={{color:"black"}}>{song.song.title}</div>
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
