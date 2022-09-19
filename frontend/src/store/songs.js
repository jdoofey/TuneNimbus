import { csrfFetch } from "./csrf"
const LOAD_CURRENT = 'songs/LOAD_CURRENT'
const LOAD_ALL  ='songs/LOAD_ALL'
const LOAD_ONE = 'songs/LOAD_ONE'
const ADD_ONE ='songs/ADD_ONE'
// const REMOVE_ONE = 'songs/REMOVE_ONE'
// const EDIT_ONE = 'songs/EDIT_ONE'

const loadCurrent = (songs) => ({
  type: LOAD_CURRENT,
  songs

})
const load = (songs) => ({
  type: LOAD_ALL,
  songs
})
const loadOneSong = (song) => ({
  type: LOAD_ONE,
  song
})
//ID NOT NECESSARY HERE?

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

export const getAllSongs = () => async dispatch => {
  const res = await fetch('/api/songs')

  if (res.ok) {
    const data = await res.json()
    dispatch(load(data))
    return data
  }
}

export const getSongsByCurrentUser = () => async dispatch => {
  const response = await fetch('/api/songs/current')
  //TODO ADD PARAMS TO SHOW RELATED ARTIST
  if (response.ok){
    const data = await response.json();
    dispatch(loadCurrent(data))
    return data
  }
}

export const getSongDeets = (songId) => async dispatch => {
  const res = await csrfFetch(`/api/songs/${songId}`)
  if(res.ok) {
    const data = await res.json()
    dispatch(loadOneSong(data))
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
    case LOAD_CURRENT:
      let newState = {};
    //  console.log('this is the action',action.songs.Songs)
      action.songs.Songs.forEach(song=> {
        newState[song.id]=song
      })
      return {...newState}
    case ADD_ONE:
      {
        const newState = {...state, [action.songs.id]: action.song}
        return {newState}
      }
    case LOAD_ONE:
      const song = action.song
      return {...state, song}
    case LOAD_ALL: {
      const newState = {}
      action.songs.Songs.forEach(song => {
        newState[song.id]=song
      })
      return {...newState}
    }
    default:
      return state
  }
}

export default songReducer
