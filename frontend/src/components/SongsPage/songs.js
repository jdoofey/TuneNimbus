import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsByCurrentUser, resetSongs } from "../../store/songs";
import "./SongPage.css"
import Song from "../Song/song";

export const SongsList = () => {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.song.allSongs);

  useEffect(() => {
    dispatch(getSongsByCurrentUser());
    return () => dispatch(resetSongs())
  }, [dispatch]);

  if (!songs) return null; //add loading page
  return (

        <ul id='list-container'>
          {Object.values(songs).map((song) => {
            return (
              <li id='list-ele'key={song.id}>
                <Song song={song} />
                
              </li>
            );
          })}
        </ul>

  );
};
