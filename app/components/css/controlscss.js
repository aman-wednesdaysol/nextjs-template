import styled from 'styled-components';

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(0deg, var(--color-background-secondary) 0%, var(--color-background) 100%);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 10px 24px;
  z-index: 1000;
  transition:
    background var(--transition-base),
    border-color var(--transition-base);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 70px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
    height: 60px;
    flex-wrap: wrap;
  }
`;

export const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 300px;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 0 0 200px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
    order: 1;
    margin-bottom: 8px;
  }
`;

export const AlbumArt = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: var(--color-background);
  overflow: hidden;
  flex-shrink: 0;
`;

export const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderArt = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-accent) 0%, #0056cc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const SongDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SongTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
`;

export const SongArtist = styled.div`
  font-size: 12px;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Controls = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all var(--transition-fast);
  font-size: 20px;

  &:hover {
    background-color: var(--color-hover);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.$primary &&
    `
    width: 40px;
    height: 40px;
    background-color: var(--color-accent);
    color: white;
    font-size: 16px;

    &:hover {
      background-color: #0056CC;
      transform: scale(1.05);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  max-width: 500px;
  height: 4px;
  background-color: var(--color-border);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--color-accent);
  border-radius: 2px;
  transition: width 0.1s linear;
`;

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  font-size: 11px;
  color: var(--color-text-secondary);
  margin-top: 4px;
`;

export const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 150px;

  @media (max-width: 768px) {
    flex: 0 0 120px;
  }

  @media (max-width: 480px) {
    flex: 1 1 50%;
    order: 2;
  }
`;

export const VolumeSlider = styled.input`
  flex: 1;
  height: 4px;
  background-color: var(--color-border);
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background-color: var(--color-accent);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background-color: var(--color-accent);
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

export const SearchContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const SearchTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text);
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0 40px;
`;

export const LoadMoreButton = styled.button`
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-background-secondary);
  color: var(--color-text);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-accent);
    background: var(--color-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
