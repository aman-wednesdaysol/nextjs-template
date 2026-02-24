import EVENTS from '@app/utils/events';
import posthog from 'posthog-js';

export const capturePlay = (trackId, userId) => {
  posthog.capture(EVENTS.SONG_PLAYED, {
    track_id: trackId,
    user_id: userId, // do we need this if we are identifying the user separately?
    timestamp: new Date().toISOString()
  });
};

export const captureProgress = (trackId, secondsPlayed) => {
  posthog.capture(EVENTS.SONG_PROGRESS, {
    track_id: trackId,
    seconds_played: secondsPlayed
  });
};

// Identify user to PostHog
export const identifyUser = (userId, email) => {
  posthog.identify(userId, {
    email
  });
};
