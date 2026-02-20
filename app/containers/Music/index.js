import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash/debounce';
import injectSaga from '@utils/injectSaga';
import SearchBar from '@components/SearchBar';
import SongList from '@components/SongList';
import AudioPlayer from '@components/AudioPlayer';
import If from '@components/If';
import ThemeToggle from '@components/ThemeToggle';
import {
  MusicPageWrapper,
  MusicPageContent,
  PageHeader,
  PageTitle,
  EmptyState,
  LoadingSpinner
} from '@components/styled/musicPage';
import { musicCreators } from './reducer';
import saga from './saga';
import { selectMusicSongs, selectMusicLoading, selectCurrentSong } from './selectors';
import { SEARCH_DEBOUNCE_MS } from './constants';

export function Music({ songs, loading, currentSong, dispatchSearch, dispatchSetSong }) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((term) => dispatchSearch(term), SEARCH_DEBOUNCE_MS),
    []
  );

  const handleSearch = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const findCurrentIndex = () => songs.findIndex((s) => s.trackId === currentSong?.trackId);

  const handleNext = () => {
    const idx = findCurrentIndex();
    if (idx < songs.length - 1) {
      dispatchSetSong(songs[idx + 1]);
    }
  };

  const handlePrev = () => {
    const idx = findCurrentIndex();
    if (idx > 0) {
      dispatchSetSong(songs[idx - 1]);
    }
  };

  return (
    <MusicPageWrapper>
      <MusicPageContent>
        <PageHeader>
          <PageTitle>MUSICA</PageTitle>
          <ThemeToggle />
        </PageHeader>
        <SearchBar value={searchValue} onChange={handleSearch} loading={loading} />
        <If condition={loading}>
          <LoadingSpinner data-testid="loading-spinner" />
        </If>
        <If condition={!loading && songs.length > 0}>
          <SongList songs={songs} currentSong={currentSong} onSelectSong={dispatchSetSong} />
        </If>
        <If condition={!loading && songs.length === 0 && searchValue.length > 0}>
          <EmptyState data-testid="empty-state">No songs found. Try a different search.</EmptyState>
        </If>
      </MusicPageContent>
      <AudioPlayer currentSong={currentSong} onNext={handleNext} onPrev={handlePrev} />
    </MusicPageWrapper>
  );
}

Music.propTypes = {
  songs: PropTypes.array,
  loading: PropTypes.bool,
  currentSong: PropTypes.object,
  dispatchSearch: PropTypes.func.isRequired,
  dispatchSetSong: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  songs: selectMusicSongs(),
  loading: selectMusicLoading(),
  currentSong: selectCurrentSong()
});

function mapDispatchToProps(dispatch) {
  const { requestSearchSongs, setCurrentSong } = musicCreators;
  return {
    dispatchSearch: (term) => dispatch(requestSearchSongs(term)),
    dispatchSetSong: (song) => dispatch(setCurrentSong(song))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'music', saga }))(Music);

export const MusicTest = Music;
