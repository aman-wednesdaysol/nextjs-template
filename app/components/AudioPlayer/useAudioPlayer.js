import { useRef, useState, useEffect, useCallback } from 'react';
import { useAudioSetup } from './useAudioSetup';
import {
  capturePlay,
  capturePause,
  captureProgress,
  captureMilestone,
  captureLeftAt,
  captureCompleted
} from 'lib/analytics';

export const useAudioPlayer = (song, onSongEnd, onPlayStateChange) => {
  const setup = useAudioSetup(onSongEnd, onPlayStateChange);
  const { audioRef, isPlaying, setIsPlaying, currentTime, duration } = setup;

  const prevTrackIdRef = useRef(song?.trackId);
  const prevVolumeRef = useRef(setup.volume || 1);
  const [isMuted, setIsMuted] = useState(false);

  const milestonesRef = useRef({ 25: false, 50: false, 75: false });

  // --- Track progress & milestones
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const current = Math.floor(audio.currentTime);
      const percent = audio.duration ? (current / audio.duration) * 100 : 0;

      // Progress every 5 seconds
      if (current % 5 === 0) {
        captureProgress(song.trackId, current);
      }

      // Milestones
      [25, 50, 75].forEach((m) => {
        if (percent >= m && !milestonesRef.current[m]) {
          captureMilestone(song.trackId, m, current);
          milestonesRef.current[m] = true;
        }
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup on unmount / song switch
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);

      const current = Math.floor(audio.currentTime);
      const percent = audio.duration ? (current / audio.duration) * 100 : 0;
      if (percent < 100) captureLeftAt(song.trackId, current, Math.floor(percent));
    };
  }, [song.trackId]);

  // --- Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current?.src) return;
    const next = !isPlaying;

    if (next) {
      audioRef.current.play().catch(() => {});
      capturePlay(song.trackId);
    } else {
      audioRef.current.pause();
      capturePause(song.trackId, Math.floor(audioRef.current.currentTime));
    }

    setIsPlaying(next);
    onPlayStateChange?.(next);
  }, [isPlaying, song.trackId, onPlayStateChange]);

  // --- Auto-play new song
  useEffect(() => {
    if (!song?.previewUrl) return;

    const isNewSong = prevTrackIdRef.current !== song.trackId;
    if (!isNewSong) return;

    // Capture left_at for previous song
    if (prevTrackIdRef.current && audioRef.current) {
      const current = Math.floor(audioRef.current.currentTime);
      const percent = audioRef.current.duration
        ? (current / audioRef.current.duration) * 100
        : 0;
      if (percent < 100) captureLeftAt(prevTrackIdRef.current, current, Math.floor(percent));
    }

    prevTrackIdRef.current = song.trackId;
    milestonesRef.current = { 25: false, 50: false, 75: false };

    audioRef.current.src = song.previewUrl;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
    capturePlay(song.trackId);
    onPlayStateChange?.(true);
  }, [song?.trackId]);

  // --- Seek & volume controls
  const seek = useCallback((time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const setVolume = useCallback((v) => {
    setup.setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) setVolume(prevVolumeRef.current);
    else {
      prevVolumeRef.current = setup.volume || 1;
      setVolume(0);
    }
    setIsMuted(!isMuted);
  }, [isMuted, setup.volume]);

  // --- Capture song completed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => captureCompleted(song.trackId);

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [song.trackId]);

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