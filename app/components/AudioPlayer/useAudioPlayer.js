import { useRef, useState, useEffect, useCallback } from 'react';
import { useAudioSetup } from './useAudioSetup';

export const useAudioPlayer = (song, onSongEnd, onPlayStateChange) => {
  const setup = useAudioSetup(onSongEnd, onPlayStateChange);
  const { audioRef, isPlaying, setIsPlaying } = setup;
  const prevTrackIdRef = useRef(song?.trackId);
  const prevVolumeRef = useRef(setup.volume || 1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!song?.previewUrl) {
      return;
    }

    const isNewSong = prevTrackIdRef.current !== song.trackId;
    prevTrackIdRef.current = song.trackId;

    if (!isNewSong) {
      return;
    }

    audioRef.current.src = song.previewUrl;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
    onPlayStateChange?.(true);
  }, [song?.trackId]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current?.src) {
      return;
    }

    const next = !isPlaying;
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(() => {});

    setIsPlaying(next);
    onPlayStateChange?.(next);
  }, [isPlaying, onPlayStateChange]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((v) => {
    setup.setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setVolume(prevVolumeRef.current);
    } else {
      prevVolumeRef.current = setup.volume || 1;
      setVolume(0);
    }
    setIsMuted(!isMuted);
  }, [isMuted, setup.volume]);

  return {
    isPlaying,
    isMuted,
    currentTime: setup.currentTime,
    duration: setup.duration,
    volume: setup.volume,
    togglePlay,
    toggleMute,
    seek,
    setVolume
  };
};
