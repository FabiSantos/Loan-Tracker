import { useState, useCallback } from 'react';

export const useCapitalize = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const capitalize = useCallback((text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }, []);

  const setCapitalizedValue = useCallback((newValue: string) => {
    setValue(capitalize(newValue));
  }, [capitalize]);

  return {
    value,
    setCapitalizedValue,
    capitalize
  };
}; 