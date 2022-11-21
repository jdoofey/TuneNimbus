import { csrfFetch } from "./csrf";

//ACTIONS DEFINITIONS
const LOAD_ALL = "albums/LOAD_ALL"
const LOAD_CURRENT = "albums/LOAD_CURRENT"
const LOAD_ONE = "albums/LOAD_ONE"
const ADD = "albums/ADD"
const EDIT = "albums/EDIT"
const DELETE = "albums/DELETE"
const RESET = "/albums/RESET"

//action creators
const loadAllAlbums = albums => ({
  type: LOAD_ALL,
  albums
})

const loadCurrentAlbums = albums => ({
  type: LOAD_CURRENT,
  albums
})

const loadOneAlbum = album => ({
  type: LOAD_ONE,
  album
})

const addAlbum = album => ({
  type: ADD,
  album
})

const editAlbum = album => ({
  type: EDIT,
  album
})

const deleteAlbum = album => ({
  type: DELETE,
  album
})

export const resetAlbums = () => ({
  type: RESET
})
