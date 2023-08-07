const VISIBILITY_UNITS = 0.001;

export default function getVisibilityKm(m) {
  return (m * VISIBILITY_UNITS).toFixed(1);
}
