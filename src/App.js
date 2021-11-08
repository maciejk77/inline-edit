import React, { useEffect, useState, useRef } from 'react';
import { runServer } from './server';
import useInput from './hooks/useInput';
import useSubmit from './hooks/useSubmit';
import useData from './hooks/useData';
import { Spinner, SuccessIcon, FailureIcon } from './icons';
import styles from './styles';

runServer();

const App = () => {
  const { handleChange, inputValue } = useInput();
  const {
    loading,
    isSuccess,
    error,
    // handleKeyDown,
    // handleBlur,
    handleInputActions,
  } = useSubmit();
  const { fetchData } = useData();

  const [isEditing, setIsEditing] = useState(false);

  const isShowingError = !loading && error;
  const isShowingSuccess = !loading && isSuccess;

  const ref = useRef(null);

  const handleKeyDown = async (evt) => {
    if (evt.key === 'Enter') {
      ref.current.blur();
      handleInputActions(evt);
    }
  };

  const handleBlur = async (evt) => {
    setIsEditing(false);
    handleInputActions(evt);
  };

  const handleFocus = () => {
    // console.log('YAYA!');
    setIsEditing(true);
  };

  useEffect(() => {
    loading && fetchData();
  }, [fetchData, loading]);

  return (
    <>
      <div style={styles.inputRow}>
        <input
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          style={styles.input}
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
