let locked = false
export function useSafeLock() {
  const lock = () => {
    locked = true
  }

  const unlock = () => {
    locked = false
  }

  const isLocked = () => locked

  return { lock, unlock, isLocked }
}