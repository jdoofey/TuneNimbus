import { useDispatch } from "react-redux";
import { useState } from "react";
import { createPlaylist } from "../../../store/playlist";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import "./CreatePlaylist.css";
const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      imageUrl,
    };
    setErrors([]);
    const exitMenu = () => {
      setShowModal(false);
    };
    const newPlaylist = await dispatch(createPlaylist(payload));
    if (newPlaylist) {
      exitMenu();
      history.push(`/playlists/${newPlaylist.id}`);
      window.alert("Your playlist has been created.");
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <button onClick={() => setShowModal(true)}>Create a New Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div id="create-container">
          <button id='close-modal'>FIX ME X</button>
            <form id="create-form" onSubmit={handleSubmit}>
              <h1>Create Your Playlist</h1>
              <label>Playlist Title</label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <label>Cover Picture</label>

              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <br></br>
              <button
                className="submit-btn"
                type="submit"
                onClick={handleSubmit}
              >
                Create Playlist
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreatePlaylist;
