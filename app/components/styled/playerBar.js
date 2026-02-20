import styled from '@emotion/styled';
import { C } from './colors';

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  background: rgba(22, 22, 34, 0.95);
  backdrop-filter: blur(16px);
  border-top: 1px solid ${C.border};
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1.25rem;
  z-index: 100;
`;

export const NowPlayingArt = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const PlayerTrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 180px;
  flex-shrink: 0;
`;

export const TrackTitle = styled.span`
  font-family: 'Syne', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${C.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TrackArtist = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.78rem;
  color: ${C.muted};
`;

export const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  justify-content: center;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${C.text};
  font-family: 'Syne', sans-serif;
  font-size: ${(p) => (p.primary ? '1rem' : '0.75rem')};
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  letter-spacing: 0.05em;
  background: ${(p) => (p.primary ? `linear-gradient(135deg, ${C.accent}, ${C.pink})` : 'transparent')};
  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.96);
  }
`;

export const ProgressSlider = styled.input`
  flex: 1;
  max-width: 300px;
  height: 4px;
  appearance: none;
  background: ${C.border};
  border-radius: 2px;
  outline: none;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${C.accent};
    cursor: pointer;
  }
`;

export const VolumeSlider = styled.input`
  width: 90px;
  height: 4px;
  appearance: none;
  background: ${C.border};
  border-radius: 2px;
  outline: none;
  flex-shrink: 0;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${C.pink};
    cursor: pointer;
  }
`;
