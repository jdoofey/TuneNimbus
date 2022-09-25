import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPlaylist } from "../../../store/playlist";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import "./CreatePlaylist.css";
const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [previewImage, setpreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false)
  let errorsArray = []
  const validations = () => {
    if (name.length<2)  {
      errorsArray.push("*Title must be longer than 2 characters")
    }
    if (name.length>15) {
      errorsArray.push("*Title must be less than 15 characters")
    }
    if (!previewImage.includes(".")) {
      errorsArray.push("*Please include a valid image")
    }
    setErrors(errorsArray)
    if (errorsArray.length) setDisplayErrors(true)
    return errorsArray
  }
  useEffect(()=> {
    if(displayErrors)validations()
  }, [name, previewImage])
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayErrors(false)
    let errorsArray = validations()
    if (errorsArray.length) return
    const payload = {
      name,
      previewImage,
    };
    setErrors([]);
    const exitMenu = () => {
      setShowModal(false);
    };
    const newPlaylist = await dispatch(createPlaylist(payload));
    if (newPlaylist) {
      exitMenu();
      // history.push(`/playlists/${newPlaylist.id}`);
      window.alert("Your playlist has been created.");
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <button
      style={{
        cursor: "pointer",
        backgroundColor: "#ff652d",
        color: "white",
        border: "none",
        height: "fit-content",
        padding: "14px 28px",
        borderRadius: "4px",
        alignSelf: "center",
        fontSize: "18px",
        alignSelf: "flex-start",
        justifySelf:"flex-start"
      }}
      id="create-playlist-btn" onClick={() => setShowModal(true)}>Create a New Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div id="create-container">
          <button id='close-modal' style={{width:"fit-content",
        display:"flex",
        justifyContent:"flex-end",
        marginTop: "-200px"}}onClick={()=> setShowModal(false)}>X</button>
            <form id="create-form" onSubmit={handleSubmit}>
              <h1>Create Your Playlist</h1>
              {errors &&
                errors.map((e, i) => {
                  if (e.length) {
                    return <li
                    style={{listStyle:"none",
                            color:"red"
                  }}
                    key={i}>{e}</li>;
                  }
                })}
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
                value={previewImage}
                onChange={(e) => setpreviewImage(e.target.value)}
              />
              <br></br>
              <button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ff652d",
                  color: "white",
                  border: "none",
                  height: "fit-content",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  alignSelf: "center",
                  fontSize: "16px",
                  padding:"10px 30px",
                }}
                type="submit"

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
