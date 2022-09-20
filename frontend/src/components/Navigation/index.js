// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignUpModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="container">
        <NavLink className="nav-ele" to="/songs">
          <button>All Music</button>
        </NavLink>
        <NavLink className="nav-ele" to="/songs/current">
          <button>Your Music</button>
        </NavLink>
        <NavLink className="nav-ele" to="/playlists/current">
          <button>Your Playlists</button>
        </NavLink>
        <NavLink className="nav-ele" to="/addsong">
          <button>Upload</button>
        </NavLink>

        <ProfileButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="nav-ele" to="/songs">
          <button>All Music</button>
        </NavLink>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div id="nav-container">
      <span>
        <img id="logo" src="https://i.imgur.com/OHysOUL.png"></img>
      </span>
      <span className="container">
        <NavLink className="nav-ele" exact to="/">
          <button>Home</button>
        </NavLink>
      </span>
      <div className="something">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
