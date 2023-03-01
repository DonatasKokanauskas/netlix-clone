import { useState } from "react";

const useTranslate = () => {
  const [translate, setTranslate] = useState({});
  const [value, setValue] = useState(-100);
  const [value2, setValue2] = useState(100);

  const handleClick = (e) => {
    if (e.currentTarget.classList.contains("right-handle")) {
      setValue2(value + 100);
      setValue((prevValue) => prevValue - 100);
      setTranslate(() => ({
        transform: `translateX(${value}%)`,
      }));
    }
    if (e.currentTarget.classList.contains("left-handle")) {
      setValue(value2 - 100);
      setValue2((prevValue) => prevValue + 100);
      setTranslate(() => ({
        transform: `translateX(${value2}%)`,
      }));
    }
  };
  return [translate, handleClick];
};

export default useTranslate;
