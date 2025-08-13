import { useState } from 'react';

const useLocalStorageState = (key: string, initialValue: string) => {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialValue);

  const setStorageValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setStorageValue] as const;
};

export default useLocalStorageState;
