import { useState } from 'react';
import { BASE_PATH, SECRET, ERROR_MESSAGE } from '../constants';

const useSubmit = () => {
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleInputActions = (evt) => {
    const { value } = evt.target;

    const submitInputValue = async () => {
      setIsLoading(true);
      await fetch(BASE_PATH, {
        method: 'POST',
        body: JSON.stringify({ input: value }),
      });

      setIsLoading(false);
    };

    const handleSuccess = () => {
      submitInputValue();

      setIsSuccess(true);
      setError(false);
    };

    const handleFailure = () => {
      submitInputValue();

      setIsSuccess(false);
      setError(ERROR_MESSAGE);
    };

    if (value === SECRET) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleKeyDown = async (evt) => {
    if (evt.key === 'Enter') {
      handleInputActions(evt);
    }
  };

  const handleBlur = async (evt) => handleInputActions(evt);

  return { loading, isSuccess, error, handleKeyDown, handleBlur };
};

export default useSubmit;
