import { useState } from "react";
import { useMoviesData } from "../context/Context";

const useTranslate = (initialValue) => {
  const [count, setCount] = useState(0);
  const [translate, setTranslate] = useState({});
  const [value, setValue] = useState(-100);
  const [value2, setValue2] = useState(100);
  const { windowSize } = useMoviesData();

  const stackLength = () => {
    if (windowSize > 1300) {
      return 9;
    } else if (windowSize <= 1300 && windowSize >= 1101) {
      return 8;
    } else if (windowSize <= 1100 && windowSize >= 951) {
      return 7;
    } else if (windowSize <= 950 && windowSize >= 851) {
      return 6;
    } else if (windowSize <= 850 && windowSize >= 621) {
      return 5;
    } else if (windowSize <= 620 && windowSize >= 501) {
      return 4;
    } else if (windowSize <= 500 && windowSize >= 301) {
      return 3;
    } else if (windowSize <= 300 && windowSize >= 151) {
      return 2;
    } else if (windowSize <= 300 && windowSize >= 151) {
      return 2;
    } else if (windowSize <= 150) {
      return 1;
    }
  };

  const handleClick = (e) => {
    if (e.currentTarget.classList.contains("right-handle")) {
      setValue((prevValue) => prevValue - 100);
      setValue2(value + 100);

      if (count < initialValue - stackLength()) {
        setTranslate(() => ({
          transform: `translateX(${value}%)`,
        }));
        setCount((prevValue) => prevValue + stackLength());
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
        if (initialValue % stackLength() === 0) {
          setTranslate(() => ({
            transform: `translateX(${
              Math.floor(initialValue / stackLength()) * -100 + 100
            }%)`,
          }));
          setValue2(Math.floor(initialValue / stackLength()) * -100 + 200);
          setCount(
            Math.floor(initialValue / stackLength()) * stackLength() -
              stackLength()
          );
        } else {
          setTranslate(() => ({
            transform: `translateX(-${Math.floor(
              initialValue / stackLength()
            )}00%)`,
          }));
          setCount(Math.floor(initialValue / stackLength()) * stackLength());
          setValue2(Math.floor(initialValue / stackLength()) * -100 + 100);
        }
      } else {
        setTranslate(() => ({
          transform: `translateX(${value2}%)`,
        }));
        setCount((prevValue) => prevValue - stackLength());
      }
    }
  };

  return [translate, handleClick];
};

export default useTranslate;
