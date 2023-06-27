import { useEffect, useRef } from "react";
import "./Bubble-Animation.scss";

const ThemeBar = () => {
  const htmlRef = useRef();
  useEffect(() => {
    htmlRef.current = document.querySelector("html");
    htmlRef.current.setAttribute("data-theme", "red");
  }, []);
  const themeChangeHandler = (e) => {
    console.log(e.target.id);
    htmlRef.current.setAttribute("data-theme", e.target.id);
  };
  return (
    <div className="themeContainer">
      <button onClick={themeChangeHandler} id="red">
        Frisky Lava
      </button>
      <button onClick={themeChangeHandler} id="green">
        Forest Calm
      </button>
      <button onClick={themeChangeHandler} id="blue">
        Deep Sea
      </button>
      <button onClick={themeChangeHandler} id="black">
        Night Light
      </button>
    </div>
  );
};

export default ThemeBar;
