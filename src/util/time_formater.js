export function formatDuration(seconds) {
  if (seconds == null || seconds <= 0) return '0s'

  if (seconds < 60) {
    return `${seconds}s`
  }

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
}
