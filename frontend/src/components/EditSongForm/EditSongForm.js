import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editSongForm } from "../../store/songs";
import { useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
import { useHistory } from "react-router-dom";
const EditSongForm = ({ song }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      previewImage,
    };
    console.log("PAYLOAD IN MODAL", payload)
    if (!title || !url || title === "" || url === "") {
      setErrors([]);
      return dispatch(editSongForm(payload)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    const exitMenu = () => {
      setShowModal(false);
    };
    let songEdit = await dispatch(editSongForm(payload));

    if (songEdit) {
      exitMenu()
      history.push(`/songs/${songId}`)
      window.alert("Your song has been updated.");
  };
}

  return (
    <>
      <button onClick={()=> setShowModal(true)}>Edit Song</button>
      {showModal && (

        <Modal onClose={()=> setShowModal(false)}>
        <form hidden={!showModal}>
          <h1>Edit Your Song</h1>
          <h3>{song.title}</h3>
          <ul>
            {errors.map((e, i) => {
              if (e !== "Invalid value") {
                return <li key={i}>{e}</li>;
              }
            })}
          </ul>
          <h3>New Title</h3>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          <h3>New Description</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          <h3>New Audio URL</h3>
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
          <h3>New Cover Image</h3>
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            />
            <div>
              <br></br>
          <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </form>
      </Modal>
    )}
    </>
  );
};

export default EditSongForm;
