import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getAllAlbumsThunk, resetAlbums } from "../../store/albums";
import './GetAllAlbums.css'

export default function GetAllAlbums() {
  const dispatch = useDispatch()
  const history = useHistory()

  const albums = useSelector(state => state.albums)

  useEffect(() => {
    dispatch(getAllAlbumsThunk())
    return () => dispatch(resetAlbums())
  }, [dispatch])

  const handleCreateAlbum = (e) => {
    e.preventDefault()
    history.push('/createalbum')
  }
  if (!Object.values(albums).length)
    return (
      <div>
        <h2>You haven't created a playlist yet</h2>
        <div>
          <h1>placeholder for create album</h1>
        </div>
      </div>
    );
  return (
    <div>
      <div className="albums-header-container">
      <h1>Albums</h1>
      <button onClick={handleCreateAlbum} className="create-album-btn">Create Album</button>
      </div>
      <div className="album-map-container">
        {Object.values(albums).map((album) => {
          return (
            <NavLink to={`/albums/${album.id}`}>

              <div className="album-card">
                <img
                  className="album-card-image"
                  src={album.previewImage === null ? "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" : album.previewImage} />
                <div>{album.title}</div>
                <div>{album.Artist.username}</div>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
