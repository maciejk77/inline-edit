import React, { useEffect, useState, useRef } from 'react';
import { Spinner, SuccessIcon, FailureIcon } from './icons';
import { BASE_PATH, INITIAL_VALUE } from './constants';

import { runServer } from './server';
import InputContext from './contexts/InputContext';

import Input from './components/Input';
import ErrorMessage from './components/ErrorMessage';
import styles from './styles';

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

  return (
    <InputContext.Provider
      value={{
        setIsLoading,
        inputValue,
        setInputValue,
        setIsSuccess,
        setError,
        isEditing,
        setIsEditing,
      }}
    >
      <div style={styles.inputRow}>
        <Input ref={inputRef} />
        <>{loading && <Spinner />}</>
        <>{!isEditing && isShowingSuccess && <SuccessIcon />}</>
        <> {!isEditing && isShowingError && <FailureIcon />}</>
      </div>

      <>{!isEditing && isShowingError && <ErrorMessage error={error} />}</>
    </InputContext.Provider>
  );
};

export default App;
