import { BASE_PATH } from '../constants';
import useInput from './useInput';

const useData = () => {
  const { setInputValue } = useInput();

  const fetchData = async () => {
    await fetch(BASE_PATH).then((json) => {
      const { text } = JSON.parse(json._bodyInit);
      setInputValue(text);
    });
  };

  return { fetchData };
};

export default useData;
