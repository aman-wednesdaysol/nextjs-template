import React from 'react';
import PropTypes from 'prop-types';
import { ControlButton, ControlButtons } from '../css/controlscss';

/**
 * PlayerControls component
 * Renders Previous / Play-Pause / Next buttons
 */
export function PlayerControls({ isPlaying, onPause, onResume, onPrevious, onNext, disabled }) {
  return (
    <ControlButtons>
      <ControlButton onClick={onPrevious} disabled={disabled} aria-label="Previous">
        ⏮
      </ControlButton>

      {isPlaying ? (
        <ControlButton $primary onClick={onPause} aria-label="Pause">
          ⏸
        </ControlButton>
      ) : (
        <ControlButton $primary onClick={onResume} aria-label="Play">
          ▶
        </ControlButton>
      )}

      <ControlButton onClick={onNext} disabled={disabled} aria-label="Next">
        ⏭
      </ControlButton>
    </ControlButtons>
  );
}

// Prop validation
PlayerControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

// Default props
PlayerControls.defaultProps = {
  disabled: false
};
