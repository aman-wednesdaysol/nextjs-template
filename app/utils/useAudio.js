import { useEffect, useRef } from 'react';

function updateAudioSource({ audio, song, volume, isPlaying, onPause }) {
  if (!song || !audio) {
    return;
  }

  const previewUrl = song.previewUrl;

  const wasPlaying = isPlaying;
  audio.src = previewUrl;
  audio.volume = volume;

  if (wasPlaying) {
    audio.play().catch(() => onPause());
  }
}

function playPauseAudio(audio, song, isPlaying, onPause) {
  if (!audio || !song) {
    return;
  }
  if (isPlaying) {
    audio.play().catch(() => onPause());
  } else {
    audio.pause();
  }
}

function updateVolume(audio, volume) {
  if (audio) {
    audio.volume = volume;
  }
}

function attachAudioEvents(audio, onSetCurrentTime, onSetDuration, onPause) {
  if (!audio) {
    return;
  }

  const handleTimeUpdate = () => onSetCurrentTime(audio.currentTime);
  const handleLoadedMetadata = () => onSetDuration(audio.duration);
  const handleEnded = () => {
    audio.currentTime = 0;
    onPause();
    onSetCurrentTime(0);
  };

  audio.addEventListener('timeupdate', handleTimeUpdate);
  audio.addEventListener('loadedmetadata', handleLoadedMetadata);
  audio.addEventListener('ended', handleEnded);

  return () => {
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    audio.removeEventListener('ended', handleEnded);
  };
}

export function useAudio({ currentSong, isPlaying, volume, onSetCurrentTime, onSetDuration, onPause }) {
  const audioRef = useRef(null);

  // Update audio src
  useEffect(() => {
    updateAudioSource({ audio: audioRef.current, song: currentSong, volume, isPlaying, onPause });
  }, [currentSong, volume, isPlaying, onPause]);

  // Play/pause handling
  useEffect(() => {
    playPauseAudio(audioRef.current, currentSong, isPlaying, onPause);
  }, [currentSong, isPlaying, onPause]);

  // Volume updates
  useEffect(() => {
    updateVolume(audioRef.current, volume);
  }, [volume]);

  // Audio event listeners
  useEffect(() => {
    const cleanup = attachAudioEvents(audioRef.current, onSetCurrentTime, onSetDuration, onPause);
    return cleanup;
  }, [currentSong, onSetCurrentTime, onSetDuration, onPause]);

  return audioRef;
}
