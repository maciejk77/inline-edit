// // import { useState } from 'react';

// import { useContext } from 'react';
// import { InputContext } from './contexts/InputContext';

// const useInput = () => {
//   const { inputValue, setInputValue } = useContext(InputContext);
//   // const [inputValue, setInputValue] = useState('Hello World');
//   // const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { value } = e.target;
//     setInputValue(value);
//   };

//   const resetState = () => {
//     setInputValue('Hello World');
//     console.log('INPUT VALUE: ', inputValue);
//   };

//   return {
//     inputValue,
//     setInputValue,
//     handleChange,
//     resetState,
//   };
// };

// export default useInput;
