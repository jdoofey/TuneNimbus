// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupFormPage from "./components/SignUpModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { SongsList } from "./components/SongsPage/songs";
import HomePage from "./components/HomePage/HomePage";
import AddSongForm from "./components/SongForm/index.js";
import SongDetails from "./components/SongDetails/SongDetail";
import AllSongs from "./components/AllSongs/AllSongs";
import { CurrentPlaylists } from "./components/Playlists/CurrentPlaylists/CurrentPlaylist";
import AudioPlayer from "react-h5-audio-player";
import Song from "./components/Song/song";
import PlaylistDetails from "./components/Playlists/PlaylistDetails/PlaylistDetails";
import CreatePlaylist from "./components/Playlists/CreatePlaylist/CreatePlaylist";
import "./components/Song/Song.css"
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    return (
      <>
      <div id="navigation">
        <Navigation isLoaded={isLoaded} />
      </div>
        {isLoaded && (
          <Switch>
            <Route exact path="/songs">
              <AllSongs setAudioUrl={setAudioUrl} />
            </Route>
            <Route exact path="/addsong">
              <AddSongForm />
            </Route>
            <Route exact path="/songs/current">
              <SongsList setAudioUrl={setAudioUrl} />
            </Route>
            <Route path="/songs/:songId">
              <SongDetails />
            </Route>
            <Route path="/playlists/current">
              <CurrentPlaylists />
            </Route>
            <Route path="/addplaylist">
              <CreatePlaylist />
            </Route>
            <Route path="/playlists/:playlistId">
              <PlaylistDetails setAudioUrl={setAudioUrl} />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>

          </Switch>
        )}
        <div id="player-container">
          <AudioPlayer src={audioUrl} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/home">
              <HomePage setAudioUrl={setAudioUrl}/>
            </Route>
            <Route exact path="/songs">
              <AllSongs setAudioUrl={setAudioUrl} />
            </Route>


            <Route path="/songs/:songId">
              <SongDetails />
            </Route>


            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
        <div id="player-container">
          <AudioPlayer src={audioUrl} />
        </div>
      </>
    );
  }
}

export default App;
