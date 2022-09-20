import { csrfFetch } from "./csrf";

const LOAD_CURRENT = "playlists/LOAD_CURENT";
const ADD_ONE = "playlists/ADD_ONE";
const DELETE_ONE = "playlists/DELETE_ONE";
const RESET_PLAYLISTS = "playlists/RESET_PLAYLISTS";

const loadCurrent = (playlists) => ({
  type: LOAD_CURRENT,
  playlists,
});

const addPlaylist = (playlist) => ({
  type: ADD_ONE,
  playlist,
});

const deletePlaylist = (playlistId) => ({
  type: DELETE_ONE,
  playlistId,
});

export const resetPLaylists = () => ({
  type: RESET_PLAYLISTS,
});
//use to clean up stale state

export const getPlaylistsByCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/playlists/current");
  if (res.ok) {
    const data = res.json();
    dispatch(loadCurrent(data));
    //return data
  }
};

export const createPlaylist = (playlist) => async (dispatch) => {
  const res = await csrfFetch("/api/playlists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlist),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addPlaylist(data));
    return data;
  }
};

export const removePlaylist = playlistId => async dispatch => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    await dispatch(deletePlaylist(songId))
    return res
  }
};

const initialState = {
  allPlaylists: {},
  singlePlaylist: {}
}

const playlistReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_CURRENT:
      let newState = {...state, allPlaylists:{...state.allPlaylists}}
      action.playlists.Playlists.forEach((playlist)=> {
        return (newState.allPlaylists[playlist.id] = playlist
        )})
      return newState;
    case ADD_ONE: {
      const singlePlaylist = action.playlist
      const newState = {...state, singlePlaylist};
      return newState
    }
    case RESET_PLAYLISTS:{
      return initialState
    }
    default:
      return state;
  }
}

export default playlistReducer
