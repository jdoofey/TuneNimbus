// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupFormPage from "./components/SignUpModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { SongsList } from "./components/SongsPage/songs";
import HomePage from "./components/HomePage/HomePage";
import AddSongForm from "./components/SongForm/index.js";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/addsong'>
            <AddSongForm />
          </Route>
          <Route path='/songs/current'>
            <SongsList />
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

export default App;
