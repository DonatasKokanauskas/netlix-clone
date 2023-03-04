import { useState } from "react";

const useTranslate = (initialValue) => {
  const [count, setCount] = useState(0);
  const [translate, setTranslate] = useState({});
  const [value, setValue] = useState(-100);
  const [value2, setValue2] = useState(100);

  const handleClick = (e) => {
    if (e.currentTarget.classList.contains("right-handle")) {
      setValue((prevValue) => prevValue - 100);
      setValue2(value + 100);

      if (count <= initialValue - 9) {
        setTranslate(() => ({
          transform: `translateX(${value}%)`,
        }));
        setCount((prevValue) => prevValue + 9);
      } else {
        setValue(-100);
        setTranslate(() => ({
          transform: `translateX(0%)`,
        }));
        setCount(0);
      }
    }
    if (e.currentTarget.classList.contains("left-handle")) {
      setValue(value2 - 100);
      setValue2((prevValue) => prevValue + 100);

      if (count < 1) {
        setValue2(-100);
        setTranslate(() => ({
          transform: `translateX(-${Math.floor(initialValue / 9)}00%)`,
        }));
        setCount(Math.floor(initialValue / 9) * 9);
      } else {
        setTranslate(() => ({
          transform: `translateX(${value2}%)`,
        }));
        setCount((prevValue) => prevValue - 9);
      }
    }
  };
  return [translate, handleClick];
};

export default useTranslate;
