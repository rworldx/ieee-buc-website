const optimizedVideos: Record<string, string> = {
  "/videos/events/branch-launch/IMG_3012.mp4":
    "/videos/events/branch-launch/IMG_3012-web.mp4",
  "/videos/events/branch-launch/IMG_3026.mp4":
    "/videos/events/branch-launch/IMG_3026-web.mp4",
  "/videos/events/branch-launch/IMG_3027.mp4":
    "/videos/events/branch-launch/IMG_3027-web.mp4",
};

export function playbackVideoUrl(original?: string) {
  return original ? (optimizedVideos[original] ?? original) : undefined;
}
