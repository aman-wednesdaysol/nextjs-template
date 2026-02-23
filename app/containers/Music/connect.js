import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '@utils/injectSaga';
import { musicCreators } from './reducer';
import { libraryCreators } from '@app/containers/Library/reducer';
import saga from './saga';
import librarySaga from '@app/containers/Library/saga';
import {
  selectMusicSongs,
  selectMusicLoading,
  selectCurrentSong,
  selectIsPlaying,
  selectHasMore,
  selectLoadingMore
} from './selectors';
import { selectLikedTrackIds } from '@app/containers/Library/selectors';

const mapStateToProps = createStructuredSelector({
  songs: selectMusicSongs(),
  loading: selectMusicLoading(),
  currentSong: selectCurrentSong(),
  isPlaying: selectIsPlaying(),
  hasMore: selectHasMore(),
  loadingMore: selectLoadingMore(),
  likedTrackIds: selectLikedTrackIds()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSearch: (term) => dispatch(musicCreators.requestSearchSongs(term)),
    dispatchSetSong: (song) => dispatch(musicCreators.setCurrentSong(song)),
    dispatchSetIsPlaying: (val) => dispatch(musicCreators.setIsPlaying(val)),
    dispatchLoadMore: () => dispatch(musicCreators.requestLoadMore()),
    dispatchFetchLibrary: () => dispatch(libraryCreators.requestFetchLibrary()),
    dispatchLike: (song) => dispatch(libraryCreators.requestLikeSong(song)),
    dispatchUnlike: (id) => dispatch(libraryCreators.requestUnlikeSong(id))
  };
}

export const connectMusic = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSaga({ key: 'music', saga }),
  injectSaga({ key: 'library', saga: librarySaga })
);
