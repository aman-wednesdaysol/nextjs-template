import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Layout from '@app/components/Layout';
import SongGrid from '@app/components/SongGrid';
import SearchBar from '@app/components/SearchBar';
import { searchActionCreators } from '@app/containers/Search/reducer';
import {
  selectSearchResults,
  selectSearchLoading,
  selectSearchTerm,
  selectSearchHasMore
} from '@app/containers/Search/selectors';
import { playerActionCreators } from '@app/containers/MusicPlayer/reducer';
import injectSaga from '@utils/injectSaga';
import saga from '@app/containers/Search/saga';
import PropTypes from 'prop-types';
import {
  SearchContainer,
  SearchTitle,
  LoadMoreContainer,
  LoadMoreButton
} from '@app/components/css/controlscss';

/** Helper to perform search and update router */
function doSearch(term, onSearch, router) {
  if (!term || !term.trim()) return;
  const trimmed = term.trim();
  onSearch(trimmed);
  router.push(`/search?q=${encodeURIComponent(trimmed)}`, undefined, { shallow: true });
}

/** Helper to play song */
function playSong(song, results, onPlaySong) {
  onPlaySong(song, results);
}

/** Helper to handle "load more" with scroll restore */
function loadMore(onLoadMore, scrollRestoreRef) {
  const scrollRoot = document.getElementById('main-scroll-area');
  if (scrollRoot) {
    scrollRestoreRef.current = { scrollTop: scrollRoot.scrollTop };
  }
  onLoadMore();
}

export function SearchPage({ results, loading, searchTerm, hasMore, onSearch, onLoadMore, onPlaySong }) {
  const router = useRouter();
  const scrollRestoreRef = useRef(null);
  const prevLoadingRef = useRef(false);

  // Trigger search if query in URL changes
  useEffect(() => {
    const query = router.query.q;
    if (query && query !== searchTerm) onSearch(query);
  }, [router.query.q]);

  // Restore scroll position after "load more"
  useEffect(() => {
    const wasLoading = prevLoadingRef.current;
    prevLoadingRef.current = loading;

    if (wasLoading && !loading && scrollRestoreRef.current) {
      const { scrollTop } = scrollRestoreRef.current;
      const scrollRoot = document.getElementById('main-scroll-area');
      if (scrollRoot) {
        scrollRoot.scrollTop = scrollTop;
      }
      scrollRestoreRef.current = null;
    }
  }, [loading]);

  // Arrow functions reduced to single-line calls to helpers
  const handleSearch = (term) => doSearch(term, onSearch, router);
  const handlePlay = (song) => playSong(song, results, onPlaySong);
  const handleLoadMore = () => loadMore(onLoadMore, scrollRestoreRef);

  return (
    <Layout showSearchBar={false}>
      <SearchContainer>
        <SearchBar onSearch={handleSearch} placeholder="Search for songs, artists..." />

        {searchTerm && (
          <SearchTitle>
            Search results for &quot;{searchTerm}&quot;
          </SearchTitle>
        )}

        <SongGrid songs={results} loading={loading} onPlay={handlePlay} />

        {hasMore && (
          <LoadMoreContainer>
            <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Loading…' : 'Load more'}
            </LoadMoreButton>
          </LoadMoreContainer>
        )}
      </SearchContainer>
    </Layout>
  );
}

SearchPage.propTypes = {
  results: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onPlaySong: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  results: selectSearchResults(),
  loading: selectSearchLoading(),
  searchTerm: selectSearchTerm(),
  hasMore: selectSearchHasMore()
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (term) => dispatch(searchActionCreators.searchRequest(term)),
  onLoadMore: () => dispatch(searchActionCreators.searchMoreRequest()),
  onPlaySong: (song, playlist) => dispatch(playerActionCreators.playSong(song, playlist))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'search', saga }))(SearchPage);
