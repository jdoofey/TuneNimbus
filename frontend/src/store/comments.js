import { csrfFetch } from "./csrf";

const LOAD_ALL = "comments/LOAD_ALL";
const EDIT = "comments/EDIT"
const ADD = "comments/ADD";
const DELETE = "comments/DELETE";
const RESET = "comments/RESET";

const loadAll = songId => ({
  type: LOAD_ALL,
  songId
})

const addComment = (comment, song )=> ({
  type: ADD,
  comment, song
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
    dispatch(loadAll(data))
    return data
  }
}
'/:songId/comments'
export const postComment = (comment, songId) => async dispatch => {
  const res = await csrfFetch(`/${songId}/comments`, {
    method:"POST",
    headers:{"Content-Type": "application/json"}
  } )
}
