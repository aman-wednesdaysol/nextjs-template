import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import AudioPlayer from '@components/AudioPlayer';
import { MusicPageWrapper } from '@components/styled/musicPage';
import { SEARCH_DEBOUNCE_MS, DEFAULT_SEARCH_TERM } from './constants';
import usePlaybackNav from './usePlaybackNav';
import useToggleLike from './useToggleLike';
import usePlayToggle from './usePlayToggle';
import useInfiniteScroll from './useInfiniteScroll';
import MusicHeader from './MusicHeader';
import MusicContent from './MusicContent';
import { connectMusic } from './connect';

export function Music(props) {
  const { songs, loading, currentSong, isPlaying, hasMore, loadingMore } = props;
  const { dispatchSearch, dispatchSetSong, dispatchSetIsPlaying, dispatchLoadMore } = props;
  const { likedTrackIds, dispatchFetchLibrary, dispatchLike, dispatchUnlike } = props;
  const [searchValue, setSearchValue] = useState(DEFAULT_SEARCH_TERM);

  useEffect(() => {
    dispatchFetchLibrary();
    dispatchSearch(DEFAULT_SEARCH_TERM);
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => dispatchSearch(term), SEARCH_DEBOUNCE_MS),
    []
  );
  const handleSearch = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };
  const { handleNext, handlePrev } = usePlaybackNav({ songs, currentSong, dispatchSetSong });
  const handleToggleLike = useToggleLike({ likedTrackIds, dispatchLike, dispatchUnlike });
  const { handlePlayToggle, registerTogglePlay } = usePlayToggle({ currentSong, dispatchSetSong });
  const sentinelRef = useInfiniteScroll({ hasMore, loadingMore, onLoadMore: dispatchLoadMore });

  return (
    <MusicPageWrapper>
      <MusicHeader />
      <MusicContent
        searchValue={searchValue}
        onSearch={handleSearch}
        songs={songs}
        loading={loading}
        loadingMore={loadingMore}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        likedTrackIds={likedTrackIds}
        onToggleLike={handleToggleLike}
        sentinelRef={sentinelRef}
        hasMore={hasMore}
      />
      <AudioPlayer
        currentSong={currentSong}
        onNext={handleNext}
        onPrev={handlePrev}
        onPlayStateChange={dispatchSetIsPlaying}
        onRegisterToggle={registerTogglePlay}
      />
    </MusicPageWrapper>
  );
}

Music.propTypes = {
  songs: PropTypes.array,
  loading: PropTypes.bool,
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool,
  hasMore: PropTypes.bool,
  loadingMore: PropTypes.bool,
  likedTrackIds: PropTypes.object,
  dispatchSearch: PropTypes.func.isRequired,
  dispatchSetSong: PropTypes.func.isRequired,
  dispatchFetchLibrary: PropTypes.func.isRequired,
  dispatchLike: PropTypes.func.isRequired,
  dispatchUnlike: PropTypes.func.isRequired,
  dispatchSetIsPlaying: PropTypes.func.isRequired,
  dispatchLoadMore: PropTypes.func.isRequired
};

export default connectMusic(Music);
export const MusicTest = Music;
