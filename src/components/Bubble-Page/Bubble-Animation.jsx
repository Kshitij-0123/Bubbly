import React, { useRef, useState, useEffect } from "react";
import "./Bubble-Animation.scss";
import ThemeBar from "./Theme-Bar";

const defaultValuesArray = [
  { value: 0, label: "Chill" },
  { value: 1, label: "Mild" },
  { value: 12, label: "Spicy" },
  { value: 20, label: "Hot" },
  { value: 59, label: "Flaming" },
  { value: 128, label: "Inferno" },
  { value: 300, label: "Blazing" },
];

function BubbleAnimation() {
  const [bubbleCount, setBubbleCount] = useState(20);
  const [notification, setNotification] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (notification !== "") {
      const timeout = setTimeout(() => setNotification(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  const changeBubbleCount = (value) => {
    if (value < 0) {
      setNotification(
        "Oops! Negative bubbles? Not possible! Sticking with 20."
      );
      setBubbleCount(20);
    } else if (value > 5000) {
      setNotification("Woah! That's too many bubbles! Sticking with 20.");
      setBubbleCount(20);
    } else if (value > 2000) {
      if (window.confirm("Are you sure? That's a massive bubble party!")) {
        setNotification("Alright, let's make it bubbly!");
        setBubbleCount(value);
      } else {
        setNotification("Wise choice! Let's keep it to 20 bubbles.");
        setBubbleCount(20);
      }
    } else {
      setBubbleCount(value);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    changeBubbleCount(Number(inputRef.current.value));
    inputRef.current.value = "";
  };

  const bubbles = Array.from({ length: bubbleCount }).map((_, i) => (
    <div
      key={i}
      className="bubble"
      style={{
        "--size": `${2 + Math.random() * 4}rem`,
        "--distance": `${6 + Math.random() * 4}rem`,
        "--position": `${-5 + Math.random() * 110}rem`,
        "--time": `${2 + Math.random() * 2}s`,
        "--delay": `${-1 * (2 + Math.random() * 2)}s`,
      }}
    />
  ));

  return (
    <>
      <ThemeBar></ThemeBar>
      <form className={`bubbleCountForm`} onSubmit={submitHandle}>
        <h1>Spice Up the Bubbles!</h1>
        <h2>Enter a Bubbly Value Below and Unleash the Magic!</h2>
        <input ref={inputRef} type="number" name="bubblesCount" />
      </form>
      <div className="handpicked">
        <h2>Embrace the Bubbly Spectrum</h2>
        {defaultValuesArray.map((item) => (
          <button
            className="defaultChoices"
            onClick={() => setBubbleCount(item.value)}
            key={item.value}
            title={item.value}
          >
            {item.label}
          </button>
        ))}
      </div>
      <footer id="footer">
        <div className="bubbles">{bubbles}</div>
        <div className="content">
          <h1>A Normal Div? Nah, We're Bubbling!</h1>
          <span>Bubble Count: {bubbleCount} and Rising!</span>
          {notification && <p>{notification}</p>}
        </div>
      </footer>
      <svg id="blobSVG">
        <defs>
          <filter id="blob">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 29 -10"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default BubbleAnimation;
