export function useProgress({ progressBarRef, duration, onSetCurrentTime, audioRef }) {
  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !duration || !audioRef.current) {
      return;
    }
    const rect = progressBarRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    onSetCurrentTime(newTime);
  };

  const progressPercentage = duration > 0 ? ((audioRef.current?.currentTime ?? 0) / duration) * 100 : 0;

  return { handleProgressClick, progressPercentage };
}
