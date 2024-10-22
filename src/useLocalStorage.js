import { useState, useEffect, useCallback } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.warn(`Error parsing stored value for ${key}:`, error);
        return storedValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const setValueAndStorage = useCallback(
    (newValue) => {
      setValue((prevValue) => {
        const valueToStore =
          newValue instanceof Function ? newValue(prevValue) : newValue;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  return [value, setValueAndStorage];
}

export default useLocalStorage;
