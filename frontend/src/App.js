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
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/songs">
              <AllSongs />
            </Route>
            <Route exact path="/addsong">
              <AddSongForm />
            </Route>
            <Route exact path="/songs/current">
              <SongsList />
            </Route>
            <Route path="/songs/:songId">
              <SongDetails />
            </Route>
            <Route path="/playlists/current">
              <CurrentPlaylists />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
      </>
    );
  } else {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
      </>
    );
  }
}

export default App;
