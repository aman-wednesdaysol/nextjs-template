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

export const capturePause = (trackId, secondsPlayed) => {
  posthog.capture(EVENTS.SONG_PAUSED, {
    track_id: trackId,
    seconds_played: secondsPlayed,
  });
};


export const captureLeftAt = (
  trackId,
  secondsPlayed,
  percentPlayed
) => {
  posthog.capture(EVENTS.SONG_LEFT_AT, {
    track_id: trackId,
    seconds_played: secondsPlayed,
    percent_played: percentPlayed,
  });
};


export const captureMilestone = (
  trackId,
  milestonePercent,
  secondsPlayed
) => {
  posthog.capture(EVENTS.SONG_MILESTONE, {
    track_id: trackId,
    milestone_percent: milestonePercent,
    seconds_played: secondsPlayed,
  });
};

// Identify user to PostHog
export const identifyUser = (userId, email) => {
  posthog.identify(userId, {
    email
  });
};
