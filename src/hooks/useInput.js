import { useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('Hello World');
  // const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const resetState = () => {
    console.log('RESET!');

    setInputValue('Hello World');
    console.log('INPUT VALUE: ', inputValue);
  };
  // const handleFocus = () => {
  //   setIsEditing(true);
  // };

  return {
    inputValue,
    setInputValue,
    handleChange,
    resetState,
    // isEditing,
    // setIsEditing,
    // handleFocus,
  };
};

export default useInput;
