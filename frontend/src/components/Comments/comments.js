import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Comments.css'
export default function Comments({song}){


  return(
    <div id="comments-container">
        <div id="song-description">Description here? :{" "}{song.description}</div>
        <div id="comments-submission">
          <form>
            <input></input>
            <button></button>
          </form>
        </div>
        <div id="comments-display">display comments here</div>
      </div>
  )
}
