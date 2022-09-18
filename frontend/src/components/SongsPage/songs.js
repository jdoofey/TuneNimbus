import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";

import Song from "../Song/song";

export const SongsList = () => {
  const dispatch = useDispatch();

  const songs = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!songs) return null;
  return (
    <div className="container">
        <ul id='list-container'>
          {Object.values(songs).map((song) => {
            return (
              <li id='list-ele'key={song.id}>
                <Song song={song} />
              </li>
            );
          })}
        </ul>
    </div>
  );
};
