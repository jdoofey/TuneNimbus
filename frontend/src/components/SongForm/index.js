import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import "./SongForm.css";

const AddSongForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [albumId, setAlbumId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  //^^this is the audio url
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      albumId,
      title,
      description,
      url,
      previewImage,
    };
    setErrors([]);


    const createdSong = await dispatch(addSong(payload));
    if (createdSong) {
      history.push(`/songs/${createdSong.id}`);
    }
  };
  return (
    <div className="bg-div">
      <div className="bg-div2">
        <div id="container">
          <form id="song-form" onSubmit={handleSubmit}>
          <br></br><br></br>
            <h1>Upload Your Music</h1>
            <ul>
              {/* TO DO ERROR HANDLING */}
              {errors &&
                errors.map((e, i) => {
                  if (e.length) {
                    return <li key={i}>{e}</li>;
                  }
                })}
            </ul>
            <label>Song Title</label>
            <input
              type="text"
              placeholder="Song Title"
              min="4"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <label>Description</label>
            <input
              type="text"
              placeholder="Song Description"
              min="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <label>Audio Url</label>
            <input
              type="text"
              placeholder="Upload Your Song Url"
              min="5"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
            />
            <br></br>
            <label>Cover Picture</label>
            <input
              type="text"
              placeholder="Upload A Cover Image URL"
              min="5"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            <br></br>
            <button id="submit-btn" className="submit-btn" type="submit">
              Upload Song
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSongForm;
