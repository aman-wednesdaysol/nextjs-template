import styled from '@emotion/styled';

export const AuthPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #0d0d0d;
  overflow: hidden;
`;

export const VisualPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #0d1117 100%);
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
  background: #0d0d0d;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
