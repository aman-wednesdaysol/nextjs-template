import React from 'react';
import PropTypes from 'prop-types';
import { useAudioPlayer } from './useAudioPlayer';
import {
  PlayerContainer,
  NowPlayingArt,
  PlayerTrackInfo,
  TrackTitle,
  TrackArtist,
  PlayerControls,
  ControlButton,
  ProgressSlider,
  VolumeSlider
} from '@components/styled/playerBar';

const AudioPlayer = ({ currentSong, onNext, onPrev }) => {
  const player = useAudioPlayer(currentSong, onNext);

  if (!currentSong) {
    return null;
  }

  return (
    <PlayerContainer data-testid="audio-player">
      <NowPlayingArt src={currentSong.artworkUrl} alt={currentSong.trackName} />
      <PlayerTrackInfo>
        <TrackTitle>{currentSong.trackName}</TrackTitle>
        <TrackArtist>{currentSong.artistName}</TrackArtist>
      </PlayerTrackInfo>
      <PlayerControls>
        <ControlButton data-testid="prev-btn" onClick={onPrev}>
          PREV
        </ControlButton>
        <ControlButton data-testid="play-btn" primary onClick={player.togglePlay}>
          {player.isPlaying ? 'PAUSE' : 'PLAY'}
        </ControlButton>
        <ControlButton data-testid="next-btn" onClick={onNext}>
          NEXT
        </ControlButton>
      </PlayerControls>
      <ProgressSlider
        data-testid="progress-slider"
        type="range"
        min={0}
        max={player.duration || 0}
        value={player.currentTime}
        onChange={(e) => player.seek(Number(e.target.value))}
      />
      <VolumeSlider
        data-testid="volume-slider"
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={player.volume}
        onChange={(e) => player.setVolume(Number(e.target.value))}
      />
    </PlayerContainer>
  );
};

AudioPlayer.propTypes = {
  currentSong: PropTypes.object,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
};

export default AudioPlayer;
