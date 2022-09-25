import { csrfFetch } from "./csrf";

const LOAD_ONE = "playlists/LOAD_ONE";
const LOAD_CURRENT = "playlists/LOAD_CURENT";
const ADD_ONE = "playlists/ADD_ONE";
const DELETE_ONE = "playlists/DELETE_ONE";
const RESET_PLAYLISTS = "playlists/RESET_PLAYLISTS";
const ADD_SONG_TO_PLAYLIST = "playlists/ADD_SONG_TO_PLAYLIST"

export const addSongPlaylist = (playlist, song) => ({
  type: ADD_SONG_TO_PLAYLIST,
  playlist, song
})
const loadOnePlaylist = (playlist) => ({
  type: LOAD_ONE,
  playlist,
});
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

export const getOnePlaylist = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOnePlaylist(data));
  }
};

export const getPlaylistsByCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/playlists/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadCurrent(data));
    return data;
  }
};
export const addSongToPlaylist = (playlistId, songId) => async dispatch => {
  const res = await csrfFetch(`/api/playlists/${playlistId}/songs`,
    {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({songId})
    })
    if (res.ok) {
      const data = await res.json()
      return data
    }
    else return res
}
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

export const removePlaylist = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    await dispatch(deletePlaylist(playlistId));
    return res;
  }
};



const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CURRENT:
      let newState = {};
      action.playlists.Playlists.forEach(
        (playlist) => (newState[playlist.id] = playlist)
      );
      return newState;
    case ADD_ONE: {
      const newState = { ...state};
      newState[action.playlist.id] = action.playlist
      return newState;
    }
    case LOAD_ONE: {
      const newState = {...state}
      newState[action.playlist.id] = action.playlist
      return newState
    }
    case DELETE_ONE: {
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    }
    // case ADD_SONG_TO_PLAYLIST: {
    //   const newState = {...state}
    //   newState[action.playlist.id] = {...state[action.playlist.id], Songs:[]}
    // }
    case RESET_PLAYLISTS: {
      return {};
    }
    default:
      return state;
  }
};

export default playlistReducer;
//REDUCER LOAD CURRENT REDUCE INSTEAD OF FOREACH
// const allPlaylists = {};
// action.playlists.Playlists.reduce((accum, current) => {
//   accum[current.id] = current;
//   return accum;
// }, allPlaylists);
//JOHN DEBUG
