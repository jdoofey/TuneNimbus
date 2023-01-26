import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getComments, submitComment, reset, editCommentThunk, removeComment } from '../../store/comments'
import './Comments.css'

export default function CreateComment ({song, songId}) {
  const dispatch = useDispatch()

  const [comment, setComment] = useState("")
  const [valErrs, setValErrs] = useState([])
  const [showErrs, setShowErrs] = useState(false)

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


  return (
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
  )
}
