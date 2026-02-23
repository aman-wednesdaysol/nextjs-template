import styled from '@emotion/styled';
import { C } from './colors';

export const ProgressSlider = styled.input`
  flex: 1;
  max-width: 300px;
  height: 4px;
  appearance: none;
  background: linear-gradient(to right, ${C.accent} var(--fill, 0%), ${C.border} var(--fill, 0%));
  border-radius: 2px;
  outline: none;
  @media (max-width: 480px) {
    flex: 0 0 100%;
    max-width: 100%;
    order: 10;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${C.accent};
    cursor: pointer;
  }
`;

export const VolumeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  @media (max-width: 480px) {
    margin-left: auto;
    cursor: pointer;
  }
`;

export const VolumeSlider = styled.input`
  width: 90px;
  height: 4px;
  appearance: none;
  background: linear-gradient(to right, ${C.accent} var(--fill, 0%), ${C.border} var(--fill, 0%));
  border-radius: 2px;
  outline: none;
  flex-shrink: 0;
  @media (max-width: 480px) {
    width: 60px;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${C.accent};
    cursor: pointer;
  }
`;
