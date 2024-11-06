import React, { useEffect, useState, useRef, useCallback } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./App.module.scss";
import Blob from "./components/Blob/Blob";
import logo from "./assets/logo.png";

/** Interface representing coordinates with x and y values */
interface ICoords {
  x: number;
  y: number;
}

/** Props interface for the App component */
interface IAppProps {
  children: React.ReactNode;
}

/**
 * Main App component that renders the application layout with interactive background effects.
 * Includes an interactive bubble that follows mouse movement, gradient blobs, and a 3D Spline object.
 *
 * @param children - Child elements to render within the component
 * @returns React component
 */
const App: React.FC<IAppProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<ICoords>({ x: 0, y: 0 });
  const interBubbleRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const currentPosition = useRef<ICoords>({ x: 0, y: 0 });

  /**
   * Handles mouse movement events and updates target coordinates
   */
  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  /**
   * Handles the animation frame updates
   */
  useEffect(() => {
    if (!interBubbleRef.current) {
      return;
    }

    const animate = () => {
      currentPosition.current = {
        x: currentPosition.current.x + (mousePosition.x - currentPosition.current.x) * 0.1,
        y: currentPosition.current.y + (mousePosition.y - currentPosition.current.y) * 0.1
      };

      interBubbleRef.current!.style.transform = `translate(${Math.round(
        currentPosition.current.x
      )}px, ${Math.round(currentPosition.current.y)}px)`;
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

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
