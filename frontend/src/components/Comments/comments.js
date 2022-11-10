import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getComments, submitComment } from '../../store/comments'
import './Comments.css'
export default function Comments() {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const song = useSelector(state => state.song.singleSong)

  const { songId } = useParams()
  const [comment, setComment] = useState("")
  const [valErrs, setValErrs] = useState([])
  const [showErrs, setShowErrs] = useState(false)

  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(getComments(songId))
    .then(()=> setIsLoaded(true))
  }, [dispatch], songId)


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
    const payload={comment:comment}

    setShowErrs(false)
    const newComment = await dispatch(submitComment(payload, song.id))
    if (newComment) setComment('')
  }
  return isLoaded && (
    <div id="comments-container">
      <div id="song-description">Description:{" "}{song.description}</div>
      <div id="comments-submission">
        <form onSubmit={onSubmit} id="comment-form">
          <input
            id="comment-input"
            type="text"
            placeholder="  Write a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="login-input"
          ></input>
          <button id="comment-submit-btn" type="submit">Post</button>
        </form>
      </div>
      <ul>
        {Object.values(comments).map(comment => {
          return comment.songId.toString() ===songId ? (
            <div style={{margin:"20px 10px", border:"1px solid grey", padding:"5px"}}>
              <div>{comment?.User?.username}</div>
              <div style={{fontSize:"12px", marginBottom:"10px"}}>{new Date(comment.createdAt).toString().slice(4, 16)}</div>
              <div>{comment.body}</div>
            </div>
          )  : null
        })}
      </ul>

    </div>
  )
}
