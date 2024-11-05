import { useRef, useState, useEffect } from "react";

// @ts-expect-error: not types for this librarry
import Scrambler from "scrambling-text";
import styles from "./Title.module.scss";
export default function ScramblingText() {
  const [text, setText] = useState("Tsunagari");

  const scramblerRef = useRef(new Scrambler());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      scramblerRef.current.scramble(text, setText, {
        characters: Scrambler.CHARACTERS.ALPHABET,
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return <h1 className={styles["title"]}>{text}</h1>;
}
