export const motionConfig = {
  // Expo-out: the pen decelerates into its mark
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Symmetric in-out for drawn strokes (rules, frames, dimension lines)
  drawEase: [0.65, 0, 0.35, 1] as [number, number, number, number],
  duration: {
    fast: 0.25,
    medium: 0.55,
    slow: 1.1,
  },
};
