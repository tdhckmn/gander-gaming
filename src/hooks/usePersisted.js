import { useState } from 'react';

export function usePersisted(key, defaultValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  function set(next) {
    setValue(next);
    try {
      if (next === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(next));
      }
    } catch {
      // storage unavailable — state still works in-memory
    }
  }

  return [value, set];
}
