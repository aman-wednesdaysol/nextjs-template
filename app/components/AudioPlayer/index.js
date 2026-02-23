import React from 'react';
import PropTypes from 'prop-types';
import {
  StepBackwardFilled,
  PlayCircleFilled,
  PauseCircleFilled,
  StepForwardFilled,
  SoundFilled
} from '@ant-design/icons';
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
  VolumeGroup,
  VolumeSlider
} from '@components/styled/playerBar';

const progressFill = (time, dur) => `${dur ? (time / dur) * 100 : 0}%`;

const AudioPlayer = ({ currentSong, onNext, onPrev, onPlayStateChange, onRegisterToggle }) => {
  const player = useAudioPlayer(currentSong, onNext, onPlayStateChange);

  React.useEffect(() => {
    if (onRegisterToggle) {
      onRegisterToggle(player.togglePlay);
    }
  }, [player.togglePlay, onRegisterToggle]);

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
          <StepBackwardFilled />
        </ControlButton>
        <ControlButton data-testid="play-btn" primary onClick={player.togglePlay}>
          {player.isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
        </ControlButton>
        <ControlButton data-testid="next-btn" onClick={onNext}>
          <StepForwardFilled />
        </ControlButton>
      </PlayerControls>
      <ProgressSlider
        data-testid="progress-slider"
        type="range"
        min={0}
        max={player.duration || 0}
        value={player.currentTime}
        onChange={(e) => player.seek(Number(e.target.value))}
        style={{ '--fill': progressFill(player.currentTime, player.duration) }}
      />
      <VolumeGroup onClick={player.toggleMute} data-testid="volume-toggle">
        <SoundFilled
          data-testid="volume-icon"
          style={{ color: player.isMuted ? '#666' : '#ff6b35', fontSize: '1rem' }}
        />
        <VolumeSlider
          data-testid="volume-slider"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={player.volume}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => player.setVolume(Number(e.target.value))}
          style={{ '--fill': `${player.volume * 100}%` }}
        />
      </VolumeGroup>
    </PlayerContainer>
  );
};

AudioPlayer.propTypes = {
  currentSong: PropTypes.object,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onPlayStateChange: PropTypes.func,
  onRegisterToggle: PropTypes.func
};

export default AudioPlayer;
