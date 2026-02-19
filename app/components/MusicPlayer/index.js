/**
 *
 * MusicPlayer Component
 *
 */
import React, {  useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { playerActionCreators } from '@app/containers/MusicPlayer/reducer';
import {
  selectCurrentSong,
  selectIsPlaying,
  selectCurrentTime,
  selectDuration,
  selectVolume,
  selectPlaylist,
  selectPlaylistIndex
} from '@app/containers/MusicPlayer/selectors';
import { getSongData } from '../SongCard/index';
import { useAudio } from '@app/utils/useAudio';
import { useMusicNavigation } from '@app/utils/useMusicNavigation';
import { useProgress } from '@app/utils/useProgress';
import { PlayerControls } from '../controls/PlayControls';
import { AlbumArt, AlbumImage, Controls, PlaceholderArt, PlayerContainer, ProgressBar, ProgressFill, SongArtist, SongDetails, SongInfo, SongTitle, TimeDisplay, VolumeControl, VolumeSlider } from '../css/controlscss';


function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function MusicPlayer({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  playlist,
  playlistIndex,
  onPlay,
  onPause,
  onResume,
  onSetCurrentTime,
  onSetVolume,
  onSetDuration,
  onNext,
  onPrevious
}) {
  const progressBarRef = useRef(null);
  const { artworkUrl, trackName, artistName } = getSongData(currentSong || {});
  
  const audioRef = useAudio({ currentSong, isPlaying, volume, onSetCurrentTime, onSetDuration, onPause });
  const { handlePrevious, handleNext } = useMusicNavigation({ playlist, playlistIndex, onNext, onPrevious, audioRef, onSetCurrentTime, onPause });
  const { handleProgressClick, progressPercentage } = useProgress({ progressBarRef, duration, onSetCurrentTime, audioRef });

  const handleVolumeChange = (e) => onSetVolume(parseFloat(e.target.value));

  if (!currentSong) return null;

  return (
    <PlayerContainer>
      <audio ref={audioRef} preload="metadata" />
      <SongInfo>
        <AlbumArt>{artworkUrl ? <AlbumImage src={artworkUrl} alt={trackName} /> : <PlaceholderArt>🎵</PlaceholderArt>}</AlbumArt>
        <SongDetails>
          <SongTitle>{trackName}</SongTitle>
          <SongArtist>{artistName}</SongArtist>
        </SongDetails>
      </SongInfo>

      <Controls>
        <PlayerControls
          isPlaying={isPlaying}
          onPause={onPause}
          onResume={onResume}
          onPrevious={handlePrevious}
          onNext={handleNext}
          disabled={!currentSong}
        />
        <ProgressBar ref={progressBarRef} onClick={handleProgressClick}>
          <ProgressFill style={{ width: `${progressPercentage}%` }} />
        </ProgressBar>
        <TimeDisplay>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </TimeDisplay>
      </Controls>

      <VolumeControl>
        <span>🔊</span>
        <VolumeSlider type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
      </VolumeControl>
    </PlayerContainer>
  );
}


MusicPlayer.propTypes = {
  currentSong: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  playlist: PropTypes.array,
  playlistIndex: PropTypes.number,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onSetCurrentTime: PropTypes.func.isRequired,
  onSetDuration: PropTypes.func.isRequired,
  onSetVolume: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  currentSong: selectCurrentSong(),
  isPlaying: selectIsPlaying(),
  currentTime: selectCurrentTime(),
  duration: selectDuration(),
  volume: selectVolume(),
  playlist: selectPlaylist(),
  playlistIndex: selectPlaylistIndex()
});

const mapDispatchToProps = (dispatch) => ({
  onPlay: (song) => dispatch(playerActionCreators.playSong(song)),
  onPause: () => dispatch(playerActionCreators.pauseSong()),
  onResume: () => dispatch(playerActionCreators.resumeSong()),
  onSetCurrentTime: (time) => dispatch(playerActionCreators.setCurrentTime(time)),
  onSetDuration: (duration) => dispatch(playerActionCreators.setDuration(duration)),
  onSetVolume: (volume) => dispatch(playerActionCreators.setVolume(volume)),
  onNext: () => dispatch(playerActionCreators.nextSong()),
  onPrevious: () => dispatch(playerActionCreators.previousSong())
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
