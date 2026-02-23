import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '@components/SearchBar';
import SongList from '@components/SongList';
import If from '@components/If';
import { MusicPageContent, EmptyState, LoadingSpinner } from '@components/styled/musicPage';
import { ScrollSentinel } from '@components/styled/songList';

const MusicContent = (props) => {
  const { searchValue, onSearch, songs, loading, loadingMore } = props;
  const { currentSong, isPlaying, onPlayToggle } = props;
  const { likedTrackIds, onToggleLike, sentinelRef, hasMore } = props;

  return (
    <MusicPageContent>
      <SearchBar value={searchValue} onChange={onSearch} loading={loading} />
      <If condition={loading && songs.length === 0}>
        <LoadingSpinner data-testid="loading-spinner" />
      </If>
      <If condition={songs.length > 0}>
        <SongList
          songs={songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayToggle={onPlayToggle}
          likedTrackIds={likedTrackIds}
          onToggleLike={onToggleLike}
        />
        <If condition={hasMore}>
          <ScrollSentinel ref={sentinelRef} data-testid="scroll-sentinel" />
        </If>
        <If condition={loadingMore}>
          <LoadingSpinner data-testid="loading-more-spinner" />
        </If>
      </If>
      <If condition={!loading && songs.length === 0 && searchValue.length > 0}>
        <EmptyState data-testid="empty-state">No songs found. Try a different search.</EmptyState>
      </If>
    </MusicPageContent>
  );
};

MusicContent.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  songs: PropTypes.array,
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool,
  onPlayToggle: PropTypes.func.isRequired,
  likedTrackIds: PropTypes.object,
  onToggleLike: PropTypes.func.isRequired,
  sentinelRef: PropTypes.object,
  hasMore: PropTypes.bool
};

export default MusicContent;
