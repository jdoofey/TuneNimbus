import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editSongForm, eviscerateSong } from "../../store/songs";
import { useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
import { useHistory } from "react-router-dom";
import "./EditSong.css";
const EditSongForm = ({ song }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const songState = useSelector((state) => state.song);

  const handleEviscerate = async (e) => {
    e.preventDefault();
 

    dispatch(eviscerateSong(songState.id));
    history.push(`/songs/current`);
  };
  useEffect(() => {
    dispatch(getSongDeets(songId));
  }, [dispatch, showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...song,
      id: songId,
      title,
      description,
      url,
      imageUrl:previewImage,
    };

    // if (!title || !url || title === "" || url === "") {
    //   setErrors([]);
    //   return dispatch(editSongForm(payload)).catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
    // }
    const exitMenu = () => {
      setShowModal(false);
    };
    let songEdit = dispatch(editSongForm(payload));

    if (songEdit) {
      exitMenu();
      history.push(`/songs/${songId}`);
      window.alert("Your song has been updated.");
    }
  };

  return (
    <>
      <button
        style={{
          cursor: "pointer",
          backgroundColor: "#ff652d",
          color: "white",
          border: "none",
          height: "fit-content",
          padding: "10px 20px",
          borderRadius: "4px",
          alignSelf: "center",
          fontSize: "18px",
          alignSelf: "flex-start",
        }}
        onClick={() => setShowModal(true)}
      >
        Edit Song
      </button>

      {showModal && (
        <div id="edit-container">
          <Modal onClose={() => setShowModal(false)}>
            <button
            id="close-modal"
            style={{marginTop:"150px"}}
            onClick={() => setShowModal(false)}>
              X
            </button>
            <form id="edit-song-form" hidden={!showModal}>
              <h1>Edit Your Song</h1>
              {/* <ul>
            {errors.map((e, i) => {
              if (e !== "Invalid value") {
                return <li key={i}>{e}</li>;
              }
            })}
          </ul> */}
              <h2>{song.title}</h2>
              <h3>New Title</h3>
              <input
                className="edit-song-inputs"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <h3>New Description</h3>
              <textarea
                style={{
                  fontFamily: "sans-serif",
                  height: "100px",
                  width: "320px",
                }}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <h3>New Audio URL</h3>
              <input
                className="edit-song-inputs"
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <h3>New Cover Image</h3>
              <input
                className="edit-song-inputs"
                type="text"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
              />
              <div>
                <br></br>
                <div id="edit-btn-container">
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
                      fontSize: "14px",
                      alignSelf: "flex-end",
                    }}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
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
                      fontSize: "14px",
                      alignSelf: "flex-end",
                    }}
                    type="button"
                    onClick={
                      handleEviscerate
                    }
                  >
                    Delete Song
                  </button>
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
                      fontSize: "14px",
                      alignSelf: "flex-end",
                    }}
                    type="button"
                    onClick={()=>setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default EditSongForm;
