import styled from '@emotion/styled';
import { C } from './colors';

export const AuthPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${C.bg};
  overflow: hidden;
`;

export const VisualPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, ${C.bg} 0%, ${C.surface} 50%, ${C.bg} 100%);
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${C.bg};
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormPanelToggle = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`;

export const MobileBrand = styled.h1`
  display: none;
  font-family: 'Syne', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: ${C.text};
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.2);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;
