import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import "./SongForm.css";

const AddSongForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  //^^this is the audio url
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false)
  let errorsArray = []
  const validations = () => {
    if (title.length<2)  {
      errorsArray.push("*Title must be longer than 2 characters")
    }
    if (title.length>15) {
      errorsArray.push("*Title must be less than 15 characters")
    }
    if (description.length<5) {
      errorsArray.push("*Description must be longer than 5 characters")
    }
    if (description.length>150) {
      errorsArray.push("*Description must be less than 150 characters")
    }
    if(!url) {
      errorsArray.push("*Please include your audio link")
    }
    if(!url.includes(".mp3")&&!url.includes(".ogg")) {
      errorsArray.push("*Please include a valid audio link")
    }
    setErrors(errorsArray)
    if (errorsArray.length) setDisplayErrors(true)
    return errorsArray
  }
  useEffect(()=> {
    if(displayErrors)validations()
  }, [title, description, url])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayErrors(false)
    let errorsArray = validations()
    if (errorsArray.length) return
    const payload = {
      title,
      description,
      url,
      previewImage,
    };
    setErrors([]);


    const createdSong = await dispatch(addSong(payload));
    if (createdSong) {
      history.push(`/songs`);
      window.alert("Your song has been uploaded.");
    }
  };
  return (
    <div className="bg-div">
      <div className="bg-div2">
        <div id="container">
          <form id="song-form" onSubmit={handleSubmit}>
          <br></br><br></br>
            <h1>Upload Your Music</h1>
            <div >
              {/* TO DO ERROR HANDLING */}
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
            </div>
            <br></br>
            <label>Song Title</label>
            <input
              type="text"
              placeholder="Song Title"
              min="2"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <label>Description</label>
            <textarea
            style={{fontFamily:"Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif",
                    height:"70px",
                    width:"300px"}}
              type="text"
              placeholder="Song Description"
              min="5"
              max="150"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <label>Audio Url</label>
            <input
              style={{width:"300px"}}
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
              style={{width:"300px"}}
              type="text"
              placeholder="Upload A Cover Image URL (not required)"
              min="5"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            <br></br><br></br>
            <button id="submit-btn" style={{cursor:"pointer"}} className="submit-btn" type="submit">
              Upload Song
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSongForm;
