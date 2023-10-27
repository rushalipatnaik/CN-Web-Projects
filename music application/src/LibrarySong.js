import React from 'react';
import './Library.css';
const LibrarySong = ({ song, currentSong, setCurrentSong }) => {
  // handlers
  const handleSelectSong = () => {
    setCurrentSong(song);
  };

  return (
    <div
      className={`library-song ${song.id === currentSong.id ? 'active' : ''}library-container`}
      onClick={handleSelectSong}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description library-song-container">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
