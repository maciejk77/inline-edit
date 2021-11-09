import React from 'react';
import styles from './styles';

const ErrorMessage = ({ error }) => <div style={styles.error}>{error}</div>;

export default ErrorMessage;
