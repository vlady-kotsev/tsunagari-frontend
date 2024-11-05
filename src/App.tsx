import React, { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./App.module.scss";
import Blob from "./components/Blob/Blob";
import logo from "./assets/logo.png";
interface ICoords {
  x: number;
  y: number;
}

interface IAppProps {
  children: React.ReactNode;
}

const App: React.FC<IAppProps> = ({ children }) => {
  const [targetCoord, setTargetCoor] = useState<ICoords>({ x: 0, y: 0 });
  const [curCoord, setCurCoord] = useState<ICoords>({ x: 0, y: 0 });
  const interBubbleRef = useRef<HTMLDivElement>(null);
  const move = () => {
    setCurCoord({
      x: curCoord.x + (targetCoord.x - curCoord.x) / 2,
      y: curCoord.y + (targetCoord.y - curCoord.y) / 2,
    });
    if (interBubbleRef.current) {
      interBubbleRef.current.style.transform = `translate(${Math.round(
        curCoord.x
      )}px, ${Math.round(curCoord.y)}px)`;
    }
    requestAnimationFrame(() => {
      move();
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    setTargetCoor({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [targetCoord]);

  return (
    <>
      <img src={logo} alt="logo" className={styles["logo"]} />
      <Spline
        id="cb1"
        className={styles["upper-cube"]}
        scene="https://prod.spline.design/GUcJdIVSYmQ5rw14/scene.splinecode"
      />
      <div className={styles["gradient-bg"]}>
        <div className={styles["children-container"]}>{children}</div>
        <svg
          className={styles["filter-svg"]}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className={styles["gradients-container"]}>
          <div className={styles["g1"]}>
            <Blob color1="00AAFF" color2="557700" />
          </div>
          <div className={styles["g2"]}>
            <Blob color1="AAFF00" color2="005577" />
          </div>
          <div className={styles["g3"]}>
            <Blob color1="FF00AA" color2="550077" />
          </div>
          <div className={styles["g4"]}>
            <Blob color1="AA00FF" color2="770055" />
          </div>
          <div className={styles["g5"]}>
            <Blob color1="FFAA00" color2="FF5733" />
          </div>
          <div ref={interBubbleRef} className={styles["interactive"]}></div>
        </div>
      </div>
    </>
  );
};

export default App;
