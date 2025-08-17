'use client';
import { useEffect, useState } from 'react';

const useLocalStorageState = (key: string, initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, [key]);

  const setStorageValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setStorageValue] as const;
};

export default useLocalStorageState;
