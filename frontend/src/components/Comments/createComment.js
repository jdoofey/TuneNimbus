import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getComments, submitComment} from '../../store/comments'
import './Comments.css'

export default function CreateComment ({song, songId}) {
  const dispatch = useDispatch()

  const [comment, setComment] = useState("")
  const [valErrs, setValErrs] = useState([])
  
  useEffect(() => {
    dispatch(getComments(songId))
  }, [dispatch, songId])


  useEffect(() => {
    const errs = []
    if (comment.length > 150) errs.push("*Comments cannot be more than 150 characters")
    setValErrs(errs)
  }, [comment])

  const onSubmit = async e => {
    e.preventDefault()

    if (!comment.length || !comment.trim().length) {
      valErrs.push("*Please type out a comment")

    }
    const payload = { comment: comment }


    const newComment = await dispatch(submitComment(payload, song.id))

    if (newComment) setComment('')
    // await dispatch(getComments(songId))
  }
   // zaka temori was here thanks man ur so big and true

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
