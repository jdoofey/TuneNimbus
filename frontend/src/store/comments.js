import { csrfFetch } from "./csrf";

const LOAD_ALL = "comments/LOAD_ALL";
const EDIT = "comments/EDIT"
const ADD = "comments/ADD";
const DELETE = "comments/DELETE";
const RESET = "comments/RESET";

const loadAll = comments => ({
  type:LOAD_ALL,
  comments
})

const editComment = comment => ({
  type:EDIT,
  comment
})

const addComment = comment => ({
  type:ADD,
  comment
})

const deleteComment = commentId => ({
  type:DELETE,
  commentId
})

export const reset = () => ({
  type: RESET,
})
