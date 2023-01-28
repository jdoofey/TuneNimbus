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

const addComment = (commentData) => ({
  type: ADD,
  commentData
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
  const res = await csrfFetch(`/api/songs/${songId}/comments`)
  if (res.ok) {
    const data = await res.json()
    dispatch(load(data))
    return data
  }
  return null
}

export const submitComment = (comment, songId) => async dispatch => {

  const res = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(addComment(data))
    return data
  }
  return null
}

export const removeComment = comment => async dispatch => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json
    dispatch(deleteComment(comment.id))
    return data
  }
}

export const editCommentThunk = comment => async dispatch => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  });
  if (response.ok) {
    const editedCommentData = await response.json();
    dispatch(editComment(editedCommentData));
    return editedCommentData
  }
}

const initialState = {
  allComments: {},
  singleCOmment: {}
}
const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL: {

      const allComments = {}

      action.songId.Comments.forEach(comment => {
        allComments[comment.id] = comment;
      });
      return { ...allComments, ...state };
    }
    case ADD:
      return {
        ...state,
        [action.commentData.id]: action.commentData
      }
    case DELETE: {
      let newState = { ...state }
      delete newState[action.commentId];
      return newState;
    }
    case RESET: {
      return initialState
    }
    default:
      return state
  }
}

export default commentReducer
