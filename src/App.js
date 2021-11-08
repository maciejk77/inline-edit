import React, { useEffect, useState, useRef } from 'react';
import { Spinner, SuccessIcon, FailureIcon } from './icons';
import {
  BASE_PATH,
  ERROR_MESSAGE,
  ENTER_KEY,
  INITIAL_VALUE,
} from './constants';

import { runServer } from './server';
import styles from './styles';

runServer();

const App = () => {
  // === hooks ===================
  const [loading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(INITIAL_VALUE);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    loading && fetchData();
  }, [fetchData, loading]);

  // === constants ===============
  let fetchData;
  const isShowingError = !loading && error;
  const isShowingSuccess = !loading && isSuccess;

  // === handlers ================
  const handleKeyDown = async (evt) => {
    if (evt.key === ENTER_KEY) {
      ref.current.blur();
      handleInputActions(evt);
    }
  };

  const handleBlur = async (evt) => {
    setIsEditing(false);
    handleInputActions(evt);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
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
        resetState();
        setError(ERROR_MESSAGE);
      }
      setIsLoading(false);
    };

    submitInputValue();
  };

  const resetState = () => {
    setInputValue(INITIAL_VALUE);
  };

  // === helpers =================
  fetchData = async () => {
    await fetch(BASE_PATH).then((json) => {
      const { text } = JSON.parse(json._bodyInit);
      setInputValue(text);
    });
  };

  // === render ==================
  return (
    <>
      <div style={styles.inputRow}>
        <input
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          style={isEditing ? styles.input : styles.inputActive}
          value={inputValue}
          ref={ref}
        />
        <div>{loading && <Spinner />}</div>
        <div>{!isEditing && isShowingSuccess && <SuccessIcon />}</div>
        <div> {!isEditing && isShowingError && <FailureIcon />}</div>
      </div>

      <div>
        {!isEditing && isShowingError && (
          <div style={styles.error}>{error}</div>
        )}
      </div>
    </>
  );
};

export default App;
