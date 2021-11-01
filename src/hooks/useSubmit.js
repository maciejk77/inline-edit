import { useState } from 'react';
import { BASE_PATH, SECRET, ERROR_MESSAGE } from '../constants';

const useSubmit = () => {
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleBlur = async (e) => {
    const { value } = e.target;

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

  return { loading, isSuccess, error, handleBlur };
};

export default useSubmit;
