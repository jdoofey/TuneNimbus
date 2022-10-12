import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs, resetSongs } from "../../store/songs";
import { Modal } from "../../context/Modal";
import Song from "../Song/song";
// import SinglePlaylist from "../Playlists/SinglePlaylist/SinglePlaylist";
import { getPlaylistsByCurrentUser } from "../../store/playlist";
import { addSongToPlaylist } from "../../store/playlist";
import CreatePlaylist from "../Playlists/CreatePlaylist/CreatePlaylist";

import "./AllSongs.css";
export default function AllSongs({ setAudioUrl }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const songs = useSelector((state) => state.song.allSongs);
  const playlists = useSelector((state) => state.playlists);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedSong, setSelectedSong] = useState(null);

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
                <>
                  {/* <button><i class="fa-solid fa-ellipsis" style={{border:"none", color:"orange", backgroundColor:"transparent"}}></i></button> */}
                  <button
                    id="add-to-playlist-tbn"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#ff652d",
                      border: "none",
                      height: "fit-content",
                      padding: "5px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      setShowModal(true);
                      setSelectedSong(song);
                    }}
                  >
                    Add to Playlist
                  </button>
                </>
              )}
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <div id="create-container">
                    <button
                      id="close-modal"
                      onClick={() => setShowModal(false)}
                    >
                      X
                    </button>
                    <h1 style={{ alignSelf: "center" }}>Your Playlists</h1>
                    {!Object.values(playlists).length && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <h5>You have no playlists yet</h5>
                      <div id="createplaylistbtn">
                        <br></br>
                        <CreatePlaylist />
                      </div>
                    </div>
                    )}
                    <ul id="add-song-to-playlist-container">
                      {Object.values(playlists).map((playlist, i) => {
                        return (
                          <div id="add-song-list-ele" key={playlist.id}>
                            <div id="addsong-container">
                              <img
                                id="smol-img"
                                src={
                                  playlist.previewImage ||
                                 "https://i.imgur.com/QwtY70m.jpg"

                                }
                              ></img>
                            </div>

                            <div id="playlistaddsong-title">
                              {i + 1}. {playlist.name}
                            </div>
                            <button
                              style={{
                                backgroundColor: "#ff652d",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                padding: "8px 20px",
                                cursor:"pointer"
                              }}
                              onClick={() => {
                                dispatch(
                                  addSongToPlaylist(
                                    playlist.id,
                                    selectedSong.id
                                  )
                                );
                                window.alert(`"${selectedSong.title}" was added to "${playlist.name}"`)
                                setShowModal(false);
                              }}
                            >
                              Add To This Playlist
                            </button>
                          </div>
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
