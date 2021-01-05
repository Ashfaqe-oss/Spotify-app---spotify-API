import React from 'react';
import "./SongRow.css";

function SongRow ( {track, playSong} ) {
    return (
      <div className="songRow" onClick={() => playSong(track.id)}>
        <img
          src={track.album.images[1].url}
          alt=""
          className="songRow__img"
        />
        <div className="songRow__info">
          <h3>{track.name}</h3>
          <p>
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    );
}

export default SongRow;