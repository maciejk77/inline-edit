import { useState } from 'react';
import { BASE_PATH, ERROR_MESSAGE } from '../constants';
import useInput from './useInput';

const useSubmit = () => {
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  const { resetState } = useInput();

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
        resetState();
        setError(ERROR_MESSAGE);
      }
      setIsLoading(false);
    };

    submitInputValue();
  };

  // const handleKeyDown = async (evt) => {
  //   if (evt.key === 'Enter') {
  //     handleInputActions(evt);
  //   }
  // };

  // const handleBlur = async (evt) => handleInputActions(evt);

  return {
    loading,
    isSuccess,
    error,
    handleInputActions,
    // handleKeyDown,
    // handleBlur,
  };
};

export default useSubmit;
