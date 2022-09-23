import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs, resetSongs } from "../../store/songs";
import { Modal } from "../../context/Modal";
import Song from "../Song/song";
import SinglePlaylist from "../Playlists/SinglePlaylist/SinglePlaylist";
import { getPlaylistsByCurrentUser } from "../../store/playlist";
import { addSongToPlaylist } from "../../store/playlist";
import { resetPLaylists } from "../../store/playlist";
import { useHistory } from "react-router-dom";
import "./AllSongs.css";
export default function AllSongs({ setAudioUrl }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const songs = useSelector((state) => state.song.allSongs);
  const playlists = useSelector((state) => state.playlists);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedSong, setSelectedSong] = useState(null);
  // const cardStyling = {
  //   listEle: {
  //     width: "fit-content"
  //   },
  //   playButton: {
  //     display:"none",
  //     width:"50px",
  //     height:"50px",
  //     borderRadius:"100px",
  //     border:"rgb(223, 145, 0) 2px solid",
  //     fontWeight:"bold",
  //     backgroundImage: "url(https://i.imgur.com/5vs8qrA.png)",
  //     backgroundSize:"cover",
  //     transition:".5s",
  //   }
  // }
  useEffect(() => {
    dispatch(getPlaylistsByCurrentUser());
    // return () => dispatch(resetPLaylists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSongs());
    return () => dispatch(resetSongs());
    //cleanup
  }, [dispatch]);

  //ADD CLICK HANDLER
  if (!Object.values(songs).length) return <p>loading...</p>;
  //TODO ADD LOADING PAGE INTO ALL COMPONENTS- NOT PRIO
  return (
    <div id="allsongs-master-container">
      <div id="allsongs-header">
        <h1>All Songs</h1>
      </div>
      <div id="list-container">
        {Object.values(songs).map((song) => {
          return (
            <div id="list-ele" key={song.id}>
              <Song song={song} />
              <button
                id="play-button"
                onClick={(e) => {
                  e.preventDefault();
                  setAudioUrl(song.url);
                }}
              ></button>

              {sessionUser && (
                <button
                  style={{ cursor: "pointer" }}
                  id="create-playlist-btn"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedSong(song);
                  }}
                >
                  Add to Playlist
                </button>
              )}
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <div id="create-container">
                    <button id="close-modal">FIX ME X</button>

                      <h1>Your Playlists</h1>
                      <ul id="curr-playlist-container">
                        {Object.values(playlists).map((playlist) => {
                          return (
                            <li id="list-ele" key={playlist.id}>
                              <SinglePlaylist playlist={playlist} />

                              <button
                                onClick={() => {
                                  console.log("HIT-------in playlist Modal")
                                  dispatch(
                                    addSongToPlaylist(
                                      playlist.id,
                                      selectedSong.id
                                    )
                                  );
                                }}
                              >
                                Add To This Playlist
                              </button>
                              <div>{playlist.name}</div>
                            </li>
                          );
                        })}
                      </ul>

                  </div>
                </Modal>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
