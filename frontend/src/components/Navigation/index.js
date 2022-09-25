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
        <NavLink className="nav-link"to="/songs">
          <button className="nav-ele">All music</button>
        </NavLink>
        <NavLink  className="nav-link" to="/songs/current">
          <button className="nav-ele">Your music</button>
        </NavLink>
        <NavLink  className="nav-link" to="/playlists/current">
          <button className="nav-ele">Your playlists</button>
        </NavLink>
        <NavLink  className="nav-link" to="/addsong">
          <button className="nav-ele">Upload</button>
        </NavLink>

        <ProfileButton user={sessionUser} />


     </div>
    );
  } else {
    sessionLinks = (
      <div className="container">
        <NavLink className="nav-link" to="/songs">
          <button  className="nav-ele">All music</button>
        </NavLink>
        <LoginFormModal />
        <SignupFormModal />
        </div>
    );
  }

  return (
    <>
    <div id="nav-container">
      <span>
        <NavLink to="/songs">
        <img id="logos" src="https://i.imgur.com/OHysOUL.png"></img>
        </NavLink>
      </span>

      <span className="container">
        {!sessionUser && (

          <NavLink className="nav-link" exact to="/">
          <button className="nav-ele">Home</button>
        </NavLink>
          )}
      </span>
      <div className="something">{isLoaded && sessionLinks}</div>
    </div>
    </>
  );
}

export default Navigation;
