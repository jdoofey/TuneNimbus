import { csrfFetch } from "./csrf";

const LOAD_ALL = "comments/LOAD_ALL";
const EDIT = "comments/EDIT"
const ADD = "comments/ADD";
const DELETE = "comments/DELETE";
const RESET = "comments/RESET";

const load = (comments, songId) => ({
  type: LOAD_ALL,
  comments, songId
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
  const res = await fetch(`/api/${songId}/comments`)
  if (res.ok) {
    const data = await res.json()
    dispatch(load(data))
    return data
  }
  return null
}
'/:songId/comments'
export const postComment = (comment, songId) => async dispatch => {
  const res = await csrfFetch(`/${songId}/comments`, {
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({})
  } )
}
