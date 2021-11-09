import React, { useEffect, useState, useRef } from 'react';
import { Spinner, SuccessIcon, FailureIcon } from './icons';
import { BASE_PATH, INITIAL_VALUE } from './constants';

import { runServer } from './server';
import styles from './styles';
import Input from './components/Input';
import InputContext from './contexts/InputContext';

runServer();

const App = () => {
  const [loading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(INITIAL_VALUE);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  let fetchData;

  useEffect(() => {
    loading && fetchData();
  }, [fetchData, loading]);

  const isShowingError = !loading && error;
  const isShowingSuccess = !loading && isSuccess;

  fetchData = async () => {
    await fetch(BASE_PATH).then((json) => {
      const { text } = JSON.parse(json._bodyInit);
      setInputValue(text);
    });
  };

  const ErrorMessage = () => <div style={styles.error}>{error}</div>;

  return (
    <InputContext.Provider
      value={{
        setIsLoading,
        inputValue,
        setInputValue,
        setIsSuccess,
        setError,
        setIsEditing,
      }}
    >
      <div style={styles.inputRow}>
        <Input
          style={isEditing ? styles.input : styles.inputActive}
          ref={inputRef}
        />
        <>{loading && <Spinner />}</>
        <>{!isEditing && isShowingSuccess && <SuccessIcon />}</>
        <> {!isEditing && isShowingError && <FailureIcon />}</>
      </div>

      <>{!isEditing && isShowingError && <ErrorMessage />}</>
    </InputContext.Provider>
  );
};

export default App;
