import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { songForm } from "../../store/songs";
import { useParams } from "react-router-dom";

const EditSongForm = ({ song }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(song.title)
  const [description, setDescription] = useState(song.description)
  const [url, setUrl] = useState(song.url)
  const [previewImage, setPreviewImage] = useState(song.previewImage)
  
}
