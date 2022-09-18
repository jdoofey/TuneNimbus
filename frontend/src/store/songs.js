import { csrfFetch } from "./csrf"
const LOAD_ALL = 'songs/LOAD_ALL'
// const LOAD_ONE = 'songs/LOAD_ONE'
const ADD_ONE ='songs/ADD_ONE'
// const REMOVE_ONE = 'songs/REMOVE_ONE'
// const EDIT_ONE = 'songs/EDIT_ONE'

const load = (songs) => ({
  type: LOAD_ALL,
  songs

})
//USER ID NOT NECESSARY HERE?

const addOneSong = (songs) => ({
  type: ADD_ONE,
  songs
})
// const editOneSong = (song) => ({
//   type: EDIT_ONE,
//   song
// })
// const removeSong = (songId) => ({
//   type: REMOVE_ONE,
//   songId
// })

// const loadOneSong = (song, songId) => ({
//   type: LOAD_ONE,
//   payload
// })

export const getSongsByCurrentUser = () => async dispatch => {
  const response = await fetch('/api/songs/current')
  //TODO ADD PARAMS TO SHOW RELATED ARTIST
  if (response.ok){
    const data = await response.json();
    dispatch(load(data))
    return data
  }
}

export const addSong = song => async dispatch => {
  const res = await csrfFetch('/api/songs/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(song)
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(addOneSong(data))
    return data
  }
}


const initialState = {};

const songReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_ALL:
     let newState = {};
     console.log('this is the action',action.songs.Songs)
      action.songs.Songs.forEach(song=> {
        newState[song.id]=song
      })
      return {...newState, ...state}
    default:
      return state
  }
}

export default songReducer
