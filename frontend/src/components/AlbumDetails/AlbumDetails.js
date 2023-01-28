import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleAlbumThunk } from "../../store/albums"
import userProfileDefault from "../../assets/user-profile-default.png"
import EditAlbumModal from "../EditAlbumModal/EditAlbumModal"
import * as moment from "moment"
import "./AlbumDetails.css"

export default function AlbumDetails({ setAudioUrl }) {
  const dispatch = useDispatch()
  const { albumId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  const sessionUser = useSelector(state => state.session.user)



  useEffect(() => {
    dispatch(getSingleAlbumThunk(albumId))
      .then(() => setIsLoaded(true))
  }, [dispatch, albumId])
  const album = useSelector(state => state.albums.singleAlbum)

  return isLoaded && (
    <div className="album-details-parent-container">
      <div className="album-details-banner">

        <div id="banner-top">
          <div id="banner-top-left">

            <div id="banner-song-details">
              <div id="song-details-title">{album?.title}</div>
              <div id="song-details-artist">{album?.Artist?.username}</div>

            </div>
          </div>
          <div id="song-details-date">
            <span className="album-details-created-at">{moment(album.createdAt).fromNow()}</span>

          </div>
        </div>
        <img
          alt="album-preview-img"
          className="album-details-preview-img"
          src={album?.previewImage === null ?
            "https://images.unsplash.com/photo-1619983081636-a91694656575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            : album?.previewImage} />

      </div>
          {(sessionUser.username === album?.Artist?.username) && (
                <EditAlbumModal album={album}/>
               )}
      <div className="album-details-description-container">
        <div className="album-details-description-left">
          <img
            alt="album-artist-prof"
            className="album-details-artist-profile"
            src={album.Artist.previewImage === null ?
              userProfileDefault : album.Artist.previewImage} />

          <span className="album-details-album-description">{album.description}</span>
        </div>
        {/* <div className="album-details-description-right">
          <button className="album-edit-btn">Edit Album</button>
        </div> */}
      </div>
      <div>
        {Object.values(album.Songs).map(song => {
          return (
            <div className="album-details-song-tile">
              <img alt="album-song-img" className="album-details-song-img" src={song.previewImage} />
              <button className="album-audio-btn" id="album-audio-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setAudioUrl(song.url);
                }}
              ></button>
              <span className="album-details-song-title">{song.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
