// // import { useState } from 'react';
// import { BASE_PATH, ERROR_MESSAGE } from '../constants';
// import useInput from './useInput';
// import InputContext from './contexts/InputContext';
// import { useContext } from 'react';

// const useSubmit = () => {
//   // const [loading, setIsLoading] = useState(false);
//   // const [isSuccess, setIsSuccess] = useState(null);
//   // const [error, setError] = useState(null);
//   const { setIsLoading, setIsSuccess, setError } = useContext(InputContext);

//   const { resetState } = useInput();

// const handleInputActions = (evt) => {
//   const { value } = evt.target;

//   const submitInputValue = async () => {
//     setIsLoading(true);
//     const response = await fetch(BASE_PATH, {
//       method: 'POST',
//       body: JSON.stringify({ input: value }),
//     });

//     const { success } = await response.json();
//     setIsSuccess(success);

//     if (success) {
//       setError(false);
//     } else {
//       resetState();
//       setError(ERROR_MESSAGE);
//     }
//     setIsLoading(false);
//   };

//   submitInputValue();
// };

//   return {
//     loading,
//     isSuccess,
//     error,
//     handleInputActions,
//   };
// };

// export default useSubmit;
