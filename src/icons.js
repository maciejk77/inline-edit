import React from 'react';
import { SpinnerRoundFilled } from 'spinners-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export const SuccessIcon = () => (
  <div style={styles.successIcon}>
    <FontAwesomeIcon icon={faCheck} />
  </div>
);

export const FailureIcon = () => (
  <div style={styles.failureIcon}>
    <FontAwesomeIcon icon={faTimesCircle} />
  </div>
);

export const Spinner = () => (
  <SpinnerRoundFilled
    color="green"
    secondarycolor="gray"
    size="25"
    speed="150"
  />
);

// refactor to CSS in JS, repetition
const styles = {
  successIcon: { display: 'flex', marginLeft: 5, color: 'green' },
  failureIcon: { display: 'flex', marginLeft: 5, color: 'red' },
};
