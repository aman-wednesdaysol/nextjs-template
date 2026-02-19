export function useMusicNavigation({ playlist, playlistIndex, onNext, onPrevious, audioRef, onSetCurrentTime, onPause }) {
    const handlePrevious = () => {
      if (playlist.length > 0 && playlistIndex > 0) return onPrevious();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        return onSetCurrentTime(0);
      }
      onPrevious();
    };
  
    const handleNext = () => {
      if (playlist.length > 0 && playlistIndex < playlist.length - 1) return onNext();
      onNext();
    };
  
    return { handlePrevious, handleNext };
  }
  