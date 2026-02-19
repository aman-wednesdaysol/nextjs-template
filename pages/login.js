import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { keyframes } from 'styled-components';
import LoginForm from '@app/components/Auth/LoginForm';
import { selectIsAuthenticated } from '@app/containers/Auth/selectors';
import injectSaga from '@utils/injectSaga';
import saga from '@app/containers/Auth/saga';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: var(--color-background);
`;

const AnimatedSide = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-accent) 0%, rgba(0, 113, 227, 0.8) 50%, rgba(0, 113, 227, 0.6) 100%);
  overflow: hidden;

  @media (max-width: 968px) {
    display: none;
  }
`;

const FormSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: var(--color-background);
  position: relative;
  z-index: 1;
`;

// Floating music note animation
const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

const wave = keyframes`
  0%, 100% {
    transform: translateX(0) scaleY(1);
  }
  50% {
    transform: translateX(10px) scaleY(1.2);
  }
`;

const MusicNote = styled.div`
  position: absolute;
  font-size: ${(props) => props.$size || '48px'};
  color: rgba(255, 255, 255, 0.3);
  animation: ${float} ${(props) => props.$duration || '4s'} ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || '0s'};
  left: ${(props) => props.$left || '10%'};
  top: ${(props) => props.$top || '20%'};
`;

const SoundWave = styled.div`
  position: absolute;
  width: 4px;
  height: 60px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  left: ${(props) => props.$left || '50%'};
  bottom: 20%;
  animation: ${wave} ${(props) => props.$duration || '1.5s'} ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || '0s'};
  transform-origin: bottom;
`;

const Circle = styled.div`
  position: absolute;
  width: ${(props) => props.$size || '200px'};
  height: ${(props) => props.$size || '200px'};
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: ${pulse} ${(props) => props.$duration || '3s'} ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || '0s'};
  left: ${(props) => props.$left || '50%'};
  top: ${(props) => props.$top || '50%'};
  transform: translate(-50%, -50%);
`;

const TitleText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  z-index: 10;
  text-align: center;
  letter-spacing: -2px;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  animation: fadeInUp 1s ease forwards;
`;

function LoginPage({ isAuthenticated }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <PageContainer>
      <AnimatedSide>
        <TitleText>myTunes</TitleText>
        <MusicNote $size="64px" $left="15%" $top="15%" $duration="5s" $delay="0s">🎵</MusicNote>
        <MusicNote $size="48px" $left="25%" $top="70%" $duration="4s" $delay="1s">🎶</MusicNote>
        <MusicNote $size="56px" $left="75%" $top="30%" $duration="6s" $delay="2s">🎼</MusicNote>
        <MusicNote $size="40px" $left="85%" $top="75%" $duration="5.5s" $delay="0.5s">🎹</MusicNote>
        <SoundWave $left="30%" $duration="1.2s" $delay="0s" />
        <SoundWave $left="35%" $duration="1.4s" $delay="0.2s" />
        <SoundWave $left="40%" $duration="1.3s" $delay="0.1s" />
        <SoundWave $left="45%" $duration="1.5s" $delay="0.3s" />
        <SoundWave $left="50%" $duration="1.2s" $delay="0s" />
        <SoundWave $left="55%" $duration="1.4s" $delay="0.2s" />
        <SoundWave $left="60%" $duration="1.3s" $delay="0.1s" />
        <SoundWave $left="65%" $duration="1.5s" $delay="0.3s" />
        <Circle $size="300px" $left="20%" $top="40%" $duration="4s" $delay="0s" />
        <Circle $size="200px" $left="80%" $top="60%" $duration="5s" $delay="1s" />
        <Circle $size="150px" $left="50%" $top="80%" $duration="3.5s" $delay="0.5s" />
      </AnimatedSide>
      <FormSide>
        <LoginForm />
      </FormSide>
    </PageContainer>
  );
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated()
});

export default compose(connect(mapStateToProps), injectSaga({ key: 'auth', saga }))(LoginPage);
