import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { songForm } from "../../store/songs";
import { useParams } from "react-router-dom";
import { getSongDeets } from "../../store/songs";
const EditSongForm = ({ song }) => {
  const dispatch = useDispatch()
  const {songId} = useParams()
  const [title, setTitle] = useState(song.title)
  const [description, setDescription] = useState(song.description)
  const [url, setUrl] = useState(song.url)
  const [previewImage, setPreviewImage] = useState(song.previewImage)
  const [errors, setErrors] = useState([])

  useEffect(()=> {
    dispatch(getSongDeets(songId))
  },[dispatch, title, description, url, previewImage, errors])

  const handleSubmit = async e => {
    e.preventDefault()

    const payload = {
      ...song,
      id: songId,
      title,
      description,
      url,
      previewImage
    }
    if (!title||!url) {
      setErrors([]);
      return dispatch(songForm(payload)).catch(
        async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors)
        }
      )
    }
    let songEdit = await dispatch(songForm)
    if (songEdit) window.alert("Your song has been updated.")
  }

  return (
    
  )
}
