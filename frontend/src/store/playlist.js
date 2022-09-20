import { csrfFetch } from "./csrf";

const LOAD_CURRENT = "playlists/LOAD_CURENT"
const ADD_ONE = "playlists/ADD_ONE"
const DELETE_ONE = "playlists/DELETE_ONE"

const loadCurrent = (playlists) => ({
  type: LOAD_CURRENT,
  playlists
})

const addPlaylist = playlist => ({
  type: ADD_ONE,
  playlist
})

const deletePlaylist = playlistId => ({
  type: DELETE_ONE,
  playlistId
})
