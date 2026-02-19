import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Layout from '@app/components/Layout';
import SongGrid from '@app/components/SongGrid';
import { homeActionCreators } from '@app/containers/Home/reducer';
import { selectTrendingTracks, selectHomeLoading, selectCountry } from '@app/containers/Home/selectors';
import { playerActionCreators } from '@app/containers/MusicPlayer/reducer';
import { getUserCountry } from '@app/utils/geolocation';
import injectSaga from '@utils/injectSaga';
import saga from '@app/containers/Home/saga';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--color-text);
  animation: fadeInUp 0.5s ease forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--color-text-secondary);
  font-size: 17px;
`;

function HomePage({ trendingTracks, loading, country, onLoadTrendingTracks, onPlaySong }) {
  useEffect(() => {
    const initializeCountryAndLoadTracks = async () => {
      const userCountry = await getUserCountry();
      if (userCountry && (!country || country !== userCountry)) {
        onLoadTrendingTracks(userCountry);
      } else if (!country) {
        // Fallback if country detection fails
        onLoadTrendingTracks('US');
      }
    };

    initializeCountryAndLoadTracks();
  }, []);

  const handlePlay = (song) => {
    onPlaySong(song, trendingTracks);
  };

  return (
    <Layout>
      <HomeContainer>
        <PageTitle>Home</PageTitle>
        {loading ? (
          <LoadingState>Loading trending tracks...</LoadingState>
        ) : (
          <SongGrid songs={trendingTracks} loading={loading} onPlay={handlePlay} />
        )}
      </HomeContainer>
    </Layout>
  );
}

HomePage.propTypes = {
  trendingTracks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  country: PropTypes.string,
  onLoadTrendingTracks: PropTypes.func.isRequired,
  onPlaySong: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  trendingTracks: selectTrendingTracks(),
  loading: selectHomeLoading(),
  country: selectCountry()
});

const mapDispatchToProps = (dispatch) => ({
  onLoadTrendingTracks: (countryCode) => dispatch(homeActionCreators.requestTrendingTracks(countryCode)),
  onPlaySong: (song, playlist) => dispatch(playerActionCreators.playSong(song, playlist))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'home', saga }))(HomePage);
