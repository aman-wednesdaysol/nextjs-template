import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = ({ hasMore, loadingMore, onLoadMore }) => {
  const sentinelRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        onLoadMore();
      }
    },
    [hasMore, loadingMore, onLoadMore]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(handleIntersect, { rootMargin: '200px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return sentinelRef;
};

export default useInfiniteScroll;
