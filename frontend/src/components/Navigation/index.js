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
        <NavLink className="nav-link" to="/">
          <button className="nav-ele">All Music</button>
        </NavLink>

        <NavLink className="nav-link" to="/albums">
          <button className="nav-ele">Albums</button>
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

        <ProfileButton user={sessionUser} />


      </div>
    );
  } else {
    sessionLinks = (
      <div className="container">
        <NavLink className="nav-link" to="/songs">
          <button className="nav-ele">All Music</button>
        </NavLink>
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <>
      <div id="nav-container">
        <div className="logo-external-links-div">
          <NavLink to="/songs">
            <img alt="main-logo" id="logos" src="https://i.imgur.com/OHysOUL.png"></img>
          </NavLink>
          <a target="_blank" rel="noreferrer" href="https://github.com/jdoofey/TuneNimbus">
          <button className="github-btn" ></button>
        </a>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/jake-matillano">
          <button className="linkedin-btn" ></button>
        </a>

          <a target="_blank" rel="noreferrer" href="https://angel.co/u/jake-matillano">
          <button className="wellfound-btn" ></button>
        </a>

        </div >

        <div className="external-links-div">
        </div>


        {!sessionUser && (
          <span className="container">
            <NavLink className="nav-link" exact to="/">
              <button className="nav-ele">Home</button>
            </NavLink>
          </span>
        )}
        {isLoaded && sessionLinks}
      </div>
    </>
  );
}

export default Navigation;
