import { useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return { inputValue, setInputValue, handleChange };
};

export default useInput;
