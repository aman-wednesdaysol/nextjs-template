/**
 *
 * SongGrid Component
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SongCard from '@app/components/SongCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
  padding: 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const StaggeredCardWrapper = styled.div`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
  animation-delay: ${(props) => props.$delay || 0}ms;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-secondary);
`;

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.p`
  font-size: 15px;
  margin: 0;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-secondary);
  font-size: 15px;
`;

/**
 * Normalizes a song object to handle both iTunes API shape
 * and pre-mapped shape gracefully.
 */

const pick = (...values) => values.find((v) => v !== undefined && v !== null);


function normalizeSong(song) {
  return {
    id: pick(song.id, song.trackId),
    trackId: pick(song.trackId, song.id),
    title: pick(song.title, song.trackName),
    artist: pick(song.artist, song.artistName),
    album: pick(song.album, song.albumName),
    cover: pick(song.cover, song.artworkUrl, song.artworkUrl100),
    previewUrl: song.previewUrl
  };
}


function renderEmptyState() {
  return (
    <EmptyState>
      <EmptyStateIcon>🔍</EmptyStateIcon>
      <EmptyStateText>No songs found. Try a different search term.</EmptyStateText>
    </EmptyState>
  );
}

function renderSongCards(songs, onPlay) {
  return songs.map((rawSong, index) => {
    const song = normalizeSong(rawSong);
    const songId = song.trackId ?? song.id ?? index;
    return (
      <StaggeredCardWrapper key={songId} $delay={Math.min(index * 50, 300)}>
        <SongCard song={song} onPlay={onPlay} />
      </StaggeredCardWrapper>
    );
  });
}

export function SongGrid({ songs, loading, onPlay }) {
  if (loading) return <LoadingState>Loading songs...</LoadingState>;
  if (!songs || songs.length === 0) return renderEmptyState();

  return <GridContainer data-testid="song-grid">{renderSongCards(songs, onPlay)}</GridContainer>;
}

SongGrid.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      trackName: PropTypes.string,
      artist: PropTypes.string,
      artistName: PropTypes.string,
      album: PropTypes.string,
      albumName: PropTypes.string,
      cover: PropTypes.string,
      artworkUrl: PropTypes.string,
      artworkUrl100: PropTypes.string,
      previewUrl: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onPlay: PropTypes.func
};

SongGrid.defaultProps = {
  songs: [],
  loading: false
};

export default SongGrid;