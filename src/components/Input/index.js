import React, { forwardRef, useContext } from 'react';
import InputContext from '../../contexts/InputContext';
import {
  BASE_PATH,
  INITIAL_VALUE,
  ENTER_KEY,
  ERROR_MESSAGE,
} from '../../constants';

const Input = ({ style }, ref) => {
  const {
    setIsLoading,
    inputValue,
    setInputValue,
    setIsSuccess,
    setError,
    setIsEditing,
  } = useContext(InputContext);

  const handleBlur = async (evt) => {
    setIsEditing(false);
    handleInputActions(evt);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleInputActions = (evt) => {
    const { value } = evt.target;

    const submitInputValue = async () => {
      setIsLoading(true);

      const response = await fetch(BASE_PATH, {
        method: 'POST',
        body: JSON.stringify({ input: value }),
      });

      const { success } = await response.json();
      setIsSuccess(success);

      if (success) {
        setError(false);
      } else {
        handleReset();
        setError(ERROR_MESSAGE);
      }
      setIsLoading(false);
    };

    submitInputValue();
  };

  const handleKeyDown = async (evt) => {
    if (evt.key === ENTER_KEY) {
      ref.current.blur();
      handleInputActions(evt);
    }
  };

  const handleReset = () => {
    setInputValue(INITIAL_VALUE);
  };

  return (
    <input
      ref={ref}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      style={style}
      value={inputValue}
    />
  );
};

const forwardedInput = forwardRef(Input);

export default forwardedInput;
