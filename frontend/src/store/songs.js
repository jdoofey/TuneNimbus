import { csrfFetch } from "./csrf";
const LOAD_CURRENT = "songs/LOAD_CURRENT";
const LOAD_ALL = "songs/LOAD_ALL";
const LOAD_ONE = "songs/LOAD_ONE";
const ADD_ONE = "songs/ADD_ONE";
const EDIT_ONE = "songs/EDIT_ONE";
const DELETE_ONE = 'songs/DELETE_ONE'
const RESET_SONGS ='songs/RESET_SONGS'
const loadCurrent = (songs) => ({
  type: LOAD_CURRENT,
  songs,
});
const load = (songs) => ({
  type: LOAD_ALL,
  songs,
});
const loadOneSong = (song) => ({
  type: LOAD_ONE,
  song,
});
//ID NOT NECESSARY HERE?

const addOneSong = (songs) => ({
  type: ADD_ONE,
  songs,
});
const editSong = (song) => ({
  type: EDIT_ONE,
  song,
});
const deleteSong = (songId) => ({
  type: DELETE_ONE,
  songId
})
export const resetSongs = () => ({
  type: RESET_SONGS,
})
export const eviscerateSong = songId => async dispatch => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    await dispatch(deleteSong(songId))
    return res
  }
}
export const getAllSongs = () => async (dispatch) => {
  const res = await csrfFetch("/api/songs");

  if (res.ok) {
    const data = await res.json();
    dispatch(load(data));
    return data;
  }
};

export const getSongsByCurrentUser = () => async (dispatch) => {
  const response = await fetch("/api/songs/current");
  //TODO ADD PARAMS TO SHOW RELATED ARTIST
  if (response.ok) {
    const data = await response.json();
    dispatch(loadCurrent(data));
    // return data;
  }
};
//TODO GET RIGHT RETURN FROM BROWSER-- ONLY WORKS ON REFRESH
export const getSongDeets = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOneSong(data));
    // return data;
  }
};
export const editSongForm = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editSong(data));
    return data;
  }
};

export const addSong = (song) => async (dispatch) => {
  const res = await csrfFetch("/api/songs/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addOneSong(data));
    return data;
  }
};

const initialState = {
    allSongs: {},
    singleSong: {}
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT:
      let newState = {...state, allSongs:{...state.allSongs}};

      action.songs.Songs.forEach((song) => (newState.allSongs[song.id] = song));
      console.log("LOAD CURRENT", newState)
      return newState;
    case ADD_ONE: {
      const singleSong = action.song
      const newState = { ...state, singleSong};
      console.log("ADD SONG",newState)
      return  newState ;
    }
    case LOAD_ONE:
      const song = action.song;
      return { ...state, ...song };
    case LOAD_ALL: {
      const newState = {...state, allSongs:{...state.allSongs}};
      action.songs.Songs.forEach((song) => (newState.allSongs[song.id] = song));
      return newState;
    }
    case EDIT_ONE:
      return {
        ...state,
        [action.song.id]: action.song,
      };
    case DELETE_ONE:{
      const newState = {...state, allSongs:{...state.allSongs}}
      delete newState.allSongs[action.songId]
      newState.singleSong = {}
      return newState
    }
    case RESET_SONGS:{
      return initialState
    }
    default:
      return state;
  }
};

export default songReducer;
