import "./mediaPlayer.css";

function MediaPlayer(trackId: number) {
  const src = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}`;
  const options = "&color=ADD8E6&show_playcount=false&sharing=false";
  return (
    <iframe
      width="100%"
      height="166"
      allow="autoplay"
      className="media-player"
      src={src + options}
    ></iframe>
  );
}

export default MediaPlayer;
