import { csrfFetch } from "./csrf";

const LOAD_ALL = "comments/LOAD_ALL";
const EDIT = "comments/EDIT"
const ADD_ONE = "comments/ADD_ONE";
const DELETE_ONE = "comments/DELETE_ONE";
const RESET = "comments/RESET";

const loadAll = comments => ({
  type:LOAD_ALL,
  comments
})

const editComment = comment => ({
  tpe:EDIT,
  comment
})
