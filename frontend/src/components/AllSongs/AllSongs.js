import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs } from "../../store/songs";
import Song from "../Song/song";
import './AllSongs.css'

export default function AllSongs ()  {
  const dispatch = useDispatch()

  const songs=useSelector((state)=> Object.values(state.song))

  useEffect(()=> {
    dispatch(getAllSongs())
  }, [dispatch])
  // if(!songs) return null
  return (
    <ul id='list-container'>
      {Object.values(songs).map(song =>{
        return (
          <li id='list-ele' key={song.id}>
            <Song song={song}/>
            <div>{song.id}</div>
          </li>
        )
      })}
    </ul>
  )
}
