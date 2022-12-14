import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,  } from 'react-router-dom'
import { getComments, submitComment, reset, editCommentThunk, removeComment } from '../../store/comments'
import './Comments.css'
export default function Comments() {

  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const song = useSelector(state => state.song.singleSong)
  const sessionUser = useSelector((state) => state.session.user);

  const { songId } = useParams()
  const [comment, setComment] = useState("")
  const [valErrs, setValErrs] = useState([])
  const [showErrs, setShowErrs] = useState(false)

  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(getComments(songId))
    .then(setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    const errs = []
    if (comment.length > 150) errs.push("*Comments cannot be more than 150 characters")
    setValErrs(errs)
  }, [comment])

  const onSubmit = async e => {
    e.preventDefault()

    if (!comment.length || !comment.trim().length) {
      valErrs.push("*Please type out a comment")
      return setShowErrs(true)
    }
    const payload = { comment: comment }

    setShowErrs(false)
    const newComment = await dispatch(submitComment(payload, song.id))
    window.alert("Your comment has been submitted")
    if (newComment) setComment('')
    await dispatch(getComments(songId))
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
        <div className='comment-error-div'>{valErrs}</div>
      </div>
      {Object.values(comments).length && (

        <ul>
          {Object.values(comments).map(comment => {
              const deleteCommentHandler = async () => {
                await window.confirm('Are you sure you want to delete this comment')
                await dispatch(removeComment(comment))
              }
            return comment?.songId.toString() === songId ? (
              <div style={{ margin: "20px 10px", border: "1px solid grey", padding: "5px" }}>
                <div>
                  <span>{comment?.User?.username}</span>
                  {comment?.User?.username === sessionUser.username && (
                    <span>

                      <button className='comment-delete-btn' onClick={deleteCommentHandler}
                    >Delete</button>
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "12px", marginBottom: "10px" }}>{new Date(comment.createdAt).toString().slice(4, 16)}</div>
                <div>{comment.body}</div>
              </div>
            ) : null
          })}
        </ul>
      )}
      {!comments && (
        <div>
          <div>No reviews yet</div>
        </div>
      )}

    </div>
  )
}
