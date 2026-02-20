/**
 *
 * SongCard Component
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: linear-gradient(145deg, var(--color-background-secondary) 0%, var(--color-background) 100%);
  border-radius: 12px;
  overflow: hidden;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: var(--color-accent);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Square aspect ratio */
  background-color: var(--color-background);
  overflow: hidden;
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-accent);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1);
    background-color: #0056cc;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const InfoContainer = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Artist = styled.p`
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaceholderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--color-accent) 0%, rgba(0, 113, 227, 0.7) 50%, #004a99 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
`;

function firstNonNull(...args) {
  return args.find((arg) => arg != null) || '';
}

export function getSongData(song) {
  return {
    artworkUrl: firstNonNull(song.artworkUrl, song.cover, song.coverImage, song.albumCover),
    trackName: firstNonNull(song.trackName, song.title, song.name, 'Unknown Title'),
    artistName: firstNonNull(song.artistName, song.artist, 'Unknown Artist')
  };
}

function playSong(onPlay, song) {
  if (onPlay) {
    onPlay(song);
  }
}

export function SongCard({ song, onPlay }) {
  const { artworkUrl, trackName, artistName } = getSongData(song);

  const handlePlay = (e) => {
    e.stopPropagation();
    playSong(onPlay, song);
  };

  const handleCardClick = () => {
    playSong(onPlay, song);
  };

  return (
    <CardContainer onClick={handleCardClick} data-testid="song-card">
      <ImageContainer>
        {artworkUrl ? <CoverImage src={artworkUrl} alt={trackName} /> : <PlaceholderImage>🎵</PlaceholderImage>}
        <PlayButtonOverlay>
          <PlayButton onClick={handlePlay} aria-label="Play song">
            ▶
          </PlayButton>
        </PlayButtonOverlay>
      </ImageContainer>
      <InfoContainer>
        <Title>{trackName}</Title>
        <Artist>{artistName}</Artist>
      </InfoContainer>
    </CardContainer>
  );
}

SongCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    artworkUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    // Legacy support
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    name: PropTypes.string,
    artist: PropTypes.string,
    cover: PropTypes.string,
    coverImage: PropTypes.string,
    albumCover: PropTypes.string
  }).isRequired,
  onPlay: PropTypes.func
};

export default SongCard;
