import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsByCurrentUser } from "../../store/songs";

import Song from "../Song/song";

export const SongsList = () => {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(getSongsByCurrentUser());
  }, [dispatch]);

  if (!songs) return null;
  return (
    <div className="container">
        <ul id='list-container'>
          {Object.values(songs).map((song) => {
            return (
              <li id='list-ele'key={song.id}>
                <Song song={song} />
                <div>{song.id}</div>
              </li>
            );
          })}
        </ul>
    </div>
  );
};
