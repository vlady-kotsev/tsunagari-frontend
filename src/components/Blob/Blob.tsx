import KUTE from "kute.js";
import { useEffect } from "react";
import styles from "./Blob.module.scss";

interface IBlobProps {
  color1: string;
  color2: string;
}

const Blob: React.FC<IBlobProps> = ({ color1, color2 }) => {
  useEffect(() => {
    const tween = KUTE.fromTo(
      "#path2",
      { path: "#path2" },
      { path: "#path1" },
      { repeat: Infinity, duration: 1000, yoyo: true }
    );
    tween.start();
  }, []);
  return (
    <div className={styles["blob-container"]}>
      <svg
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <g transform="translate(444.1472004324918 304.4469610071424)">
          <path
            id="path1"
            d="M70.7 -110.7C91.8 -110.4 109.1 -91.7 121.7 -70.2C134.3 -48.7 142.1 -24.3 134.6 -4.3C127.1 15.7 104.3 31.3 88.7 47.6C73.1 64 64.8 80.9 51.2 90.6C37.7 100.2 18.8 102.6 0.6 101.6C-17.7 100.6 -35.3 96.2 -49.8 87C-64.2 77.9 -75.4 63.9 -88.1 48.6C-100.7 33.3 -114.9 16.7 -121.5 -3.8C-128.1 -24.3 -127.3 -48.7 -118.1 -70C-109 -91.4 -91.5 -109.8 -70.4 -110.1C-49.3 -110.5 -24.7 -92.7 0.1 -92.9C24.8 -93 49.7 -111 70.7 -110.7"
            fill={`#${color1}`}
          ></path>
        </g>
        <g transform="translate(442.1351082566903 326.97659409294533)">
          <path
            id="path2"
            d="M87.7 -155.1C117.5 -134.8 147.9 -118.9 154.4 -93.8C160.9 -68.7 143.5 -34.3 145.3 1.1C147.2 36.5 168.4 73 156.8 89.2C145.2 105.5 100.7 101.5 69.1 105.2C37.5 109 18.8 120.5 -5.5 129.9C-29.7 139.4 -59.3 146.8 -79.5 136.4C-99.7 126.1 -110.5 98.1 -121.8 72.4C-133.2 46.7 -145.1 23.3 -144.5 0.3C-143.9 -22.7 -130.9 -45.3 -115.9 -64.8C-101 -84.3 -84.3 -100.6 -64.6 -126.8C-45 -152.9 -22.5 -189 3.2 -194.6C29 -200.2 58 -175.5 87.7 -155.1"
            fill={`#${color2}`}
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default Blob;
