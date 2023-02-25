import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsByCurrentUser, resetSongs } from "../../store/songs";
import "../AllSongs/AllSongs.css";
import "./SongPage.css";
import Song from "../Song/song";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { addSongToPlaylist } from "../../store/playlist";
import { getPlaylistsByCurrentUser } from "../../store/playlist";

export const SongsList = ({ setAudioUrl }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = useSelector((state) => state.song.allSongs);
  const playlists = useSelector((state) => state.playlists);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getPlaylistsByCurrentUser());
    // return () => dispatch(resetPLaylists());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSongsByCurrentUser());
    return () => dispatch(resetSongs());
  }, [dispatch]);

  if (!songs) return null; //add loading page

  if (Object.values(songs).length)
    return (
      <div className="your-songs-master">
        <div className="your-songs-header">
          <h1>Your songs</h1>
        </div>
        <div id="curr-list-container">
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
                      <button id="close-modal">X</button>

                      <h1 style={{ alignSelf: "center" }}>Your Playlists</h1>
                      <ul id="add-song-to-playlist-container">
                        {Object.values(playlists).map((playlist, i) => {
                          return (
                            <div id="add-song-list-ele" key={playlist.id}>
                              <div id="addsong-container">
                                <img
                                  id="kelly-size-img"
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
                                  cursor:"pointer",
                                }}
                                onClick={() => {
                                  dispatch(
                                    addSongToPlaylist(
                                      playlist.id,
                                      selectedSong.id
                                    )
                                  );
                                  window.alert(`"${selectedSong.title}" was added to "${playlist.name}"`)
                                  setShowModal(false)
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
    else return (
      <div className="your-songs-master">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>You haven't uploaded any music yet</h2>
            <button
              onClick={() => {
                history.push("/addsong");
              }}
              style={{
                width: "fit-content",
                cursor: "pointer",
                backgroundColor: "#ff652d",
                color: "white",
                border: "none",
                height: "fit-content",
                padding: "20px 30px",
                borderRadius: "4px",
                alignSelf: "center",
                fontSize: "18px",
                padding: "10px 30px",
              }}
            >
              Upload a song
            </button>
          </div>
        </div>
      </div>
    );
};
