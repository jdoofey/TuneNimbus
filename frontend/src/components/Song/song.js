import './Song.css'
function Song(song) {
  return (
    <div id="test">
      <img id="placeholder-img" src="https://i.imgur.com/7c6If3V.jpg"></img>
      <div id="title">{song.song.title}</div>
      <div id="description">{song.song.description}</div>
    </div>
  );
}

export default Song
