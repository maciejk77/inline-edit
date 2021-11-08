import React, { useEffect } from 'react';
import { runServer } from './server';
import useInput from './hooks/useInput';
import useSubmit from './hooks/useSubmit';
import useData from './hooks/useData';
import { Spinner, SuccessIcon, FailureIcon } from './icons';
import styles from './styles';

runServer();

const App = () => {
  const { handleChange, inputValue } = useInput();
  const { loading, isSuccess, error, handleKeyDown, handleBlur } = useSubmit();
  const { fetchData } = useData();

  const isShowingError = !loading && error;
  const isShowingSuccess = !loading && isSuccess;

  useEffect(() => {
    loading && fetchData();
  }, [fetchData, loading]);

  return (
    <>
      <div style={styles.inputRow}>
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          style={styles.input}
          value={inputValue}
        />
        <div>{loading && <Spinner />}</div>
        <div>{isShowingSuccess && <SuccessIcon />}</div>
        <div>{isShowingError && <FailureIcon />}</div>
      </div>

      <div>{isShowingError && <div style={styles.error}>{error}</div>}</div>
    </>
  );
};

export default App;
