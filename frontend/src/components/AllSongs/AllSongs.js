import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs, resetSongs } from "../../store/songs";
import Song from "../Song/song";
import './AllSongs.css'

export default function AllSongs ({setAudioUrl})  {
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
    <div id='list-container'>
      {Object.values(songs).map(song =>{
        return (
          <div id='list-ele' key={song.id}>
            <Song song={song}/>
            <button id="play-button" onClick={e=>{
              e.preventDefault()
              setAudioUrl(song.url)
            }}></button>
          </div>
        )
      })}
    </div>
  )
}
