/**
 * Start a silent background loop.
 *
 * React does not reliably carry the `muted` attribute through hydration, and
 * browsers refuse to autoplay anything that is not muted — so set the
 * property by hand right before playing. A refusal is not worth surfacing:
 * the poster frame is already on screen.
 */
export function playMuted(video: HTMLVideoElement) {
  video.muted = true;
  void video.play().catch(() => {});
}
