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

  return (
    <>
    <div id="nav-top">
      <div id ="navbar">
        <div id="left-container">
          <img src="https://i.imgur.com/OHysOUL.png"></img>
        <NavLink className="nav-link" to="/songs">
          <button className="nav-ele">All Music</button>
        </NavLink>
        <NavLink className="nav-link" to="/songs/current">
          <button className="nav-ele">Your Music</button>
        </NavLink>
        <NavLink className="nav-link" to="/playlists/current">
          <button className="nav-ele">Your Playlists</button>
        </NavLink>
        <NavLink className="nav-link" to="/addsong">
          <button className="nav-ele">Upload</button>
        </NavLink>

        </div>
      </div>
    </div>
    </>
  );
}

export default Navigation;
