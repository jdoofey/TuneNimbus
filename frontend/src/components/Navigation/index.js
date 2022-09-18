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
      <>
        <NavLink id="current-songs" to="/songs/current">
          My Songs
        </NavLink>
        <NavLink to="/addsong">
          Add Song
        </NavLink>

        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
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
      <span>
        <NavLink id="nav-home" exact to="/">
          Home
        </NavLink>
      </span>
      <div className="something">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
