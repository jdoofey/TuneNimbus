import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, submitComment } from '../../store/comments'
import './Comments.css'
export default function Comments() {
  const dispatch = useDispatch()
  const song = useSelector(state=> state.song.singleSong)
  const [comment, setComment] = useState("")
  const [valErrs, setValErrs] = useState([])
  const [showErrs, setShowErrs] = useState(false)
  useEffect(()=>{

    dispatch(getComments(song.id))

  }, [dispatch])
  useEffect(() => {
    const errs = []
    if (comment.length > 250) errs.push("Comments cannot be more than 250 characters")
    setValErrs(errs)
  }, [comment])
  const onSubmit = async e => {
    e.preventDefault()

    if (!comment.length) {
      valErrs.push("Please type out a comment")
      return setShowErrs(true)
    }
    const payload = {
      comment:comment,
      songId: song.id
    }
    setShowErrs(false)
    const newComment = await dispatch(submitComment(payload))
    if (newComment) setComment('')
  }
  return (
    <div id="comments-container">
      <div id="song-description">Description here? :{" "}{song.description}</div>
      <div id="comments-submission">
        <form>
          <input
            type="text"
            placeholder="Write a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></input>
          <button type="submit">Post</button>
        </form>
      </div>
      {/* <div id="comments-display">{comments.body}</div> */}
    </div>
  )
}
