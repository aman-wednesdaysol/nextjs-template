import React from 'react';
import PropTypes from 'prop-types';
import {
  SongListWrapper,
  SongCard,
  SongArtwork,
  SongInfo,
  SongTitle,
  SongArtist,
  SongAlbum
} from '@components/styled/songList';

const SongList = ({ songs, currentSong, onSelectSong }) => (
  <SongListWrapper data-testid="song-list">
    {songs.map((song) => (
      <SongCard
        key={song.trackId}
        data-testid={`song-${song.trackId}`}
        isActive={currentSong?.trackId === song.trackId}
        onClick={() => onSelectSong(song)}
      >
        <SongArtwork src={song.artworkUrl} alt={song.trackName} />
        <SongInfo>
          <SongTitle>{song.trackName}</SongTitle>
          <SongArtist>{song.artistName}</SongArtist>
          <SongAlbum>{song.albumName}</SongAlbum>
        </SongInfo>
      </SongCard>
    ))}
  </SongListWrapper>
);

SongList.propTypes = {
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
  onSelectSong: PropTypes.func.isRequired
};

export default SongList;
