import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editAlbumThunk, getSingleAlbumThunk, resetAlbums } from '../../store/albums';
import { Modal } from '../../context/Modal'
import "./EditAlbumModal.css"


export default function EditAlbumModal({album}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const previewImage = album.previewImage === null? 'None' : album.previewImage
  const [albumTitle, setAlbumTitle] = useState(`${album.title}`);
  const [albumDescript, setAlbumDescript] = useState(`${album.description}`);
  const [albumImage, setAlbumImage] = useState(`${previewImage}`);

  const [titleErr, setTitleErr] = useState('');
  const [descriptErr, setDescriptErr] = useState('');
  const [imageErr, setImageErr] = useState('');

  const [validationErrs, setValidationErrs] = useState([]);
  const [showErrors, setShowErrors] = useState(false)
  const updateAlbumTitle = (e) => setAlbumTitle(e.target.value);
  const updateAlbumDescript = (e) => setAlbumDescript(e.target.value);
  const updateAlbumImage = (e) => setAlbumImage(e.target.value);

  useEffect(() => {
    const errors = []
    if (albumTitle.length > 40 || albumTitle.length < 2 || !albumTitle.trim().length) {
      errors.push('Title must be between 2 and 40 characters')
      setTitleErr('Title must be between 2 and 40 characters')
    }
    if (albumDescript.length > 100) {
      errors.push('Description cannot be more than 100 characters')
      setDescriptErr('Description cannot be more than 100 characters')
    }
    if (!albumDescript.trim().length) {
      errors.push('Description cannot be empty spaces')
      setDescriptErr('Description cannot be empty spaces')
    }
    if (albumImage !== 'None' && !albumImage.match(/\.(jpg|jpeg|png|gif)$/)) {
      errors.push('Please enter a valid image(jpg/jpeg/png).')
      setImageErr('Please enter a valid image(jpg/jpeg/png).')
    }
    setValidationErrs(errors)
  }, [albumTitle, albumDescript, albumImage])

  const handleEditSubmit = async e => {
    e.preventDefault()
    if (validationErrs.length) setShowErrors(true)

    else {
      setShowErrors(false)

      const payload = {
        id: album.id,
        title: albumTitle,
        description: albumDescript,
        previewImage: albumImage === 'None'? null : albumImage
      }
      const createdAlbum = await dispatch(editAlbumThunk(payload))
      if (createdAlbum) {
        await dispatch(getSingleAlbumThunk(album.id))
        setShowModal(false)
        window.alert('Your Album has been created')
      }
    }
  }
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Album</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <form onSubmit={handleEditSubmit}>
              <div className="create-album-form-container">
                <h1 style={{ justifySelf: "center", alignSelf: "center" }}>Create Your New Album</h1>

                <span className="label-error-container">
                  <label className="album-title-label">Title
                  </label>
                  {!!showErrors && !!titleErr.length && (
                    <span className="create-album-error-text">{titleErr}</span>
                  )}
                </span>

                <input
                  className="album-title-input album-input"
                  type="text"
                  value={albumTitle}
                  onChange={updateAlbumTitle}
                  required
                />
                <span className="label-error-container">
                  <label className="album-description-label">Description
                  </label>
                  {!!showErrors && !!descriptErr.length && (
                    <span className="create-album-error-text">{descriptErr}</span>
                  )}
                </span>
                <input
                  className="album-description-input album-input"
                  type="text"
                  value={albumDescript}
                  onChange={updateAlbumDescript}
                  required
                />

                <span className="label-error-container">

                  <label className="album-image-label">Preview Image
                  </label>
                  {!!showErrors && !!imageErr.length && (
                    <span className="create-album-error-text">{imageErr}</span>
                  )}
                </span>
                <input
                  className="album-image-input album-input"
                  type="text"
                  value={albumImage}
                  onChange={updateAlbumImage}
                  required
                />


                {/* <label>Add a Song (You can add more later)</label>
          <select
            className="album-song-input album-input"
          >
            {Object.values(currentSongs).map(song => {
              return (
                <option value={song.id}>{song.title}</option>
              )
            })}
          </select> */}

                <span className="album-form-btns-container">
                  <div>{" "}</div>
                  <button className="album-form-btn" type="submit">Add Album</button>
                  <div>{" "}</div>
                </span>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  )


}
