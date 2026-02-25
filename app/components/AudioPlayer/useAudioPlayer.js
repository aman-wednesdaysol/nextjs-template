import { useRef, useState, useEffect, useCallback } from 'react';
import { useAudioSetup } from './useAudioSetup';
import {
  capturePlay,
  capturePause,
  captureProgress,
  captureMilestone,
  captureLeftAt,
  captureCompleted
} from '@lib/analytics';

// --- Pure helpers

const getPlaybackPercent = (audio) => (audio.duration ? (Math.floor(audio.currentTime) / audio.duration) * 100 : 0);

const captureProgressIfNeeded = (trackId, current) => {
  if (current % 5 === 0) {
    captureProgress(trackId, current);
  }
};

const checkMilestones = (trackId, percent, milestonesRef) => {
  [25, 50, 75].forEach((m) => {
    if (percent >= m && !milestonesRef.current[m]) {
      captureMilestone(trackId, m, Math.floor(percent));
      milestonesRef.current[m] = true;
    }
  });
};

const captureLeftAtIfNeeded = (trackId, audio) => {
  const current = Math.floor(audio.currentTime);
  const percent = Math.floor(getPlaybackPercent(audio));
  if (percent < 100) {
    captureLeftAt(trackId, current, percent);
  }
};

const makeHandleTimeUpdate = (audio, trackId, milestonesRef) => () => {
  captureProgressIfNeeded(trackId, Math.floor(audio.currentTime));
  checkMilestones(trackId, getPlaybackPercent(audio), milestonesRef);
};

const applyPlay = (audioRef, trackId) => {
  audioRef.current.play().catch(() => {});
  capturePlay(trackId);
};

const applyPause = (audioRef, trackId) => {
  audioRef.current.pause();
  capturePause(trackId, Math.floor(audioRef.current.currentTime));
};

const applyTogglePlay = ({ audioRef, isPlaying, trackId, setIsPlaying, onPlayStateChange }) => {
  const next = !isPlaying;
  if (next) {
    applyPlay(audioRef, trackId);
  } else {
    applyPause(audioRef, trackId);
  }
  setIsPlaying(next);
  onPlayStateChange?.(next);
};

const startNewSong = (audioRef, song, setIsPlaying, onPlayStateChange) => {
  audioRef.current.src = song.previewUrl;
  audioRef.current.play().catch(() => {});
  setIsPlaying(true);
  capturePlay(song.trackId);
  onPlayStateChange?.(true);
};

const handleSongChange = ({ audioRef, song, prevTrackIdRef, milestonesRef, setIsPlaying, onPlayStateChange }) => {
  if (prevTrackIdRef.current && audioRef.current) {
    captureLeftAtIfNeeded(prevTrackIdRef.current, audioRef.current);
  }
  prevTrackIdRef.current = song.trackId;
  milestonesRef.current = { 25: false, 50: false, 75: false };
  startNewSong(audioRef, song, setIsPlaying, onPlayStateChange);
};

const applyTogglePlayIfReady = ({ audioRef, song, isPlaying, setIsPlaying, onPlayStateChange }) => {
  if (!audioRef.current.src || !song.trackId) {
    return;
  }
  applyTogglePlay({ audioRef, isPlaying, trackId: song.trackId, setIsPlaying, onPlayStateChange });
};

const applyToggleMute = ({ isMuted, setVolume, prevVolumeRef, currentVolume, setIsMuted }) => {
  if (isMuted) {
    setVolume(prevVolumeRef.current);
  } else {
    prevVolumeRef.current = currentVolume || 1;
    setVolume(0);
  }
  setIsMuted(!isMuted);
};

const applySetVolume = (setup, audioRef, v) => {
  setup.setVolumeState(v);
  if (audioRef.current) {
    audioRef.current.volume = v;
  }
};

const registerTimeUpdate = (audio, trackId, milestonesRef) => {
  const handleTimeUpdate = makeHandleTimeUpdate(audio, trackId, milestonesRef);
  audio.addEventListener('timeupdate', handleTimeUpdate);
  return () => {
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    captureLeftAtIfNeeded(trackId, audio);
  };
};

// ---

export const useAudioPlayer = (song, onSongEnd, onPlayStateChange) => {
  const setup = useAudioSetup(onSongEnd, onPlayStateChange);
  const { audioRef, isPlaying, setIsPlaying, currentTime, duration } = setup;

  const prevTrackIdRef = useRef(song?.trackId);
  const prevVolumeRef = useRef(setup.volume || 1);
  const [isMuted, setIsMuted] = useState(false);
  const milestonesRef = useRef({ 25: false, 50: false, 75: false });

  const trackId = song ? song.trackId : null;
  const previewUrl = song ? song.previewUrl : null;

  // --- Track progress & milestones
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !trackId) {
      return;
    }
    return registerTimeUpdate(audio, trackId, milestonesRef);
  }, [trackId]);

  // --- Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current || !song) {
      return;
    }
    applyTogglePlayIfReady({ audioRef, song, isPlaying, setIsPlaying, onPlayStateChange });
  }, [isPlaying, song, onPlayStateChange]);

  // --- Auto-play new song
  useEffect(() => {
    if (!previewUrl || !trackId) {
      return;
    }
    if (prevTrackIdRef.current === trackId) {
      return;
    }
    handleSongChange({ audioRef, song, prevTrackIdRef, milestonesRef, setIsPlaying, onPlayStateChange });
  }, [trackId]);

  // --- Seek & volume controls
  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((v) => {
    applySetVolume(setup, audioRef, v);
  }, []);

  const toggleMute = useCallback(() => {
    applyToggleMute({ isMuted, setVolume, prevVolumeRef, currentVolume: setup.volume, setIsMuted });
  }, [isMuted, setup.volume]);

  // --- Capture song completed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !trackId) {
      return;
    }
    const handleEnded = () => captureCompleted(trackId);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [trackId]);

  return {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    volume: setup.volume,
    togglePlay,
    toggleMute,
    seek,
    setVolume
  };
};
