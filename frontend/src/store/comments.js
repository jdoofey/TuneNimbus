import { csrfFetch } from "./csrf";

const LOAD_ALL = "comments/LOAD_ALL";
const EDIT = "comments/EDIT"
const ADD = "comments/ADD";
const DELETE = "comments/DELETE";
const RESET = "comments/RESET";

const load = (songId) => ({
  type: LOAD_ALL,
  songId
})

const addComment = (comment, songId )=> ({
  type: ADD,
  comment, songId
})
const editComment = comment => ({
  type: EDIT,
  comment
})


const deleteComment = commentId => ({
  type: DELETE,
  commentId
})

export const reset = () => ({
  type: RESET,
});

export const getComments = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/comments`)
  if (res.ok) {
    const data = await res.json()
    console.log("why no hit", data)
    await dispatch(load(data))
    return data
  }
  return null
}

export const submitComment = (comment, songId) => async dispatch => {
  const res = await csrfFetch(`/api/${songId}/comments`, {
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({comment})
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(addComment(data))
    return data
  }
  return null
}

export const removeComment = commentId => async dispatch => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method:"DELETE"
  })
  if (response.ok) {
    dispatch(deleteComment(commentId))
    return response
  }
}

const initialState = {}
const newState ={}
const commentReducer = (state ={}, action) => {
  const song = action.song
  switch(action.type) {
    case LOAD_ALL:
      action.comments.Comments(comment => {
        song[comment.id] = comment
      })
    case ADD:

      newState = {song: {...state.song}}
      newState.song[action.comment.id] = action.comment
      return newState

    case DELETE:
      newState={song:{...state.song}}
      delete newState.song[action.commentId]
      return newState
    case RESET:
      return initialState
    default:
      return state
  }
}

export default commentReducer
