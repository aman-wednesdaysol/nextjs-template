import styled from '@emotion/styled';
import { C } from './colors';
export { ProgressSlider, VolumeGroup, VolumeSlider } from './playerSliders';

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  background: var(--musica-cardBg);
  backdrop-filter: blur(16px);
  border-top: 1px solid ${C.border};
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1.25rem;
  z-index: 100;
  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 0.75rem;
  }
  @media (max-width: 480px) {
    height: auto;
    padding: 0.5rem 0.75rem;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
`;

export const NowPlayingArt = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
`;

export const PlayerTrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 180px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 120px;
  }
  @media (max-width: 480px) {
    width: 90px;
  }
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
  @media (max-width: 480px) {
    gap: 0.25rem;
    flex: 0 0 100%;
    order: 5;
  }
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${C.text};
  font-size: ${(p) => (p.primary ? '1.6rem' : '1.1rem')};
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.primary ? `linear-gradient(135deg, ${C.accent}, ${C.pink})` : 'transparent')};
  &:hover {
    transform: scale(1.15);
  }
  &:active {
    transform: scale(0.94);
  }
  @media (max-width: 480px) {
    padding: 0.4rem 0.5rem;
    font-size: ${(p) => (p.primary ? '1.4rem' : '1rem')};
  }
`;
