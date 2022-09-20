import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs, resetSongs } from "../../store/songs";
import Song from "../Song/song";
import './AllSongs.css'

export default function AllSongs ()  {
  const dispatch = useDispatch()

  const songs=useSelector((state)=> state.song.allSongs)

  useEffect(()=> {
    dispatch(getAllSongs())
    return () => dispatch(resetSongs())
    //cleanup
  }, [dispatch])
  if(!Object.values(songs).length) return (<p>loading...</p>)
  //TODO ADD LOADING PAGE INTO ALL COMPONENTS- NOT PRIO
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
