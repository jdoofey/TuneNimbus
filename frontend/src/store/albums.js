import { csrfFetch } from "./csrf";

//ACTIONS DEFINITIONS
const LOAD_ALL = "albums/LOAD_ALL";
const LOAD_CURRENT = "albums/LOAD_CURRENT";
const LOAD_ONE = "albums/LOAD_ONE";
const ADD = "albums/ADD";
const EDIT = "albums/EDIT";
const DELETE = "albums/DELETE";
const RESET = "/albums/RESET";

//action creators
const loadAllAlbums = albums => ({
  type: LOAD_ALL,
  albums
})

const loadCurrentAlbums = albums => ({
  type: LOAD_CURRENT,
  albums
});

const loadOneAlbum = album => ({
  type: LOAD_ONE,
  album
});

const addAlbum = album => ({
  type: ADD,
  album
});

const editAlbum = album => ({
  type: EDIT,
  album
});

const deleteAlbum = album => ({
  type: DELETE,
  album
});

export const resetAlbums = () => ({
  type: RESET
});


//THUNKS
export const getAllAlbumsThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/albums`);
  if (response.ok) {
    const albumsData = await response.json();
    await dispatch(loadAllAlbums(albumsData));
    return albumsData;
  }
  return "Bad Data";
}

export const getCurrentUserAlbumsThunk = () => async dispatch => {
  const response = await csrfFetch(`/api/albums/current`);
  if (response.ok){
    const albumsData = await response.json();
    await dispatch(loadCurrentAlbums(albumsData));
    return albumsData;
  }
  return "Bad Data";
}

export const getSingleAlbumThunk = (albumId) => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`);
  if (response.ok) {
    const albumData = await response.json();
    await dispatch(loadOneAlbum(albumData));
    return albumData;
  }
  return "Bad Data";
}

export const addAlbumThunk = album => async dispatch => {
  const response = await csrfFetch('/api/albums', {
    method:'POST',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(album)
  });
  if(response.ok) {
    const newAlbumData = await response.json();
    await dispatch(addAlbum(newAlbumData));
    return newAlbumData
  }
  return "Bad Data"
}

export const editAlbumThunk = album => async dispatch => {
  const response = await csrfFetch(`/api/albums/${album.id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(album)
  });
  if (response.ok) {
    const editedAlbumData = await response.json();
    await dispatch (editAlbum(editedAlbumData));
    return editedAlbumData
  }
  return "Bad Data"
}

export const deleteAlbumThunk = albumId => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    const deletedAlbumData = await response.json()
    await dispatch(deleteAlbum(deletedAlbumData))
    return deletedAlbumData
  }
  return "Bad Data"
}
