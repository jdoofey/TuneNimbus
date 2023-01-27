import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getComments, removeComment, reset } from '../../store/comments'
import CreateComment from './createComment'
import './Comments.css'

export default function Comments() {

  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments);
  const song = useSelector(state => state.song.singleSong);
  const sessionUser = useSelector((state) => state.session.user);

  const { songId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getComments(songId))
      .then(setIsLoaded(true));
  }, [dispatch, songId])



  const deleteCommentHandler = async (comment) => {
    await window.confirm('Are you sure you want to delete this comment')
    let something = await dispatch(removeComment(comment))
    if (something){

      await dispatch(getComments(songId))
    }
  }


  return isLoaded && (
    <div id="comments-container">
      <div id="song-description">Description:{" "}{song.description}</div>
      <CreateComment song={song} songId={songId} />
      {!!Object.values(comments).length && (

        <ul>
          {Object.values(comments).map(comment => {

            return comment?.songId.toString() === songId ? (
              <div style={{ margin: "20px 10px", border: "1px solid grey", padding: "5px" }}>
                <div>
                  <span>{comment?.User?.username}</span>
                  {comment?.User?.username === sessionUser.username && (
                    <span>

                      <button
                      className='comment-delete-btn'
                      onClick={() => deleteCommentHandler(comment)}
                      hidden={sessionUser.id !== comment?.User?.id}
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
