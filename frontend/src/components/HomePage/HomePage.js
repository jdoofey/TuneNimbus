import "./HomePage.css";
import SignupForm from "../SignUpModal";
import "../SongsPage/SongPage.css";
import "../AllSongs/AllSongs.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs, resetSongs } from "../../store/songs";
import Song from "../Song/song";
const HomePage = ({ setAudioUrl }) => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.allSongs);
  useEffect(() => {
    dispatch(getAllSongs());
    return () => dispatch(resetSongs());
    //cleanup
  }, [dispatch]);

    return (
      <div id="page-container">
        <div id="whatever">
          <div id="welcome-container">
            <h1>Welcome to TuneNimbus</h1>
            <h3>What's next in music is first on TuneNimbus</h3>
            <h5 id="para">
              Upload your first track and begin your journey. TuneNimbus gives
              you space to create, find your fans, and connect with other
              artists.
            </h5>
            <h4>Check out some music below!</h4>
          </div>
        </div>
        <div className="middle-container">
          <div id="list-container">
            {Object.values(songs).map((song) => {
              return (
                <div id="list-el" key={song.id}>
                  <Song song={song} />



                  <button
                    id="play-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setAudioUrl(song.url);
                    }}
                    ></button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom-container">
          <div id="shader">
            <div className="bottom-text">
              <h1>Calling All Creators</h1>
              <h2>
                Get on TuneNimbus to connect with fans, share your sounds, and
                grow your audience. What are you waiting for? Join up to one
                other user on the site and start your music career!
              </h2>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    );

};

export default HomePage;
