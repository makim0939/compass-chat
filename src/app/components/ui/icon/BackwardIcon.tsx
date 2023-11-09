import React from "react";
import styles from "./icon.module.scss";
const ORIGIN_SIZE = 64;

const BackwardIcon = ({
  fill = "#D9D9D9",
  size = 36,
  margin = "0 0 0 0",
  onClick,
}: {
  fill?: string;
  size?: number;
  margin?: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.container}
      style={{ width: size, height: size, margin }}
    >
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${ORIGIN_SIZE} ${ORIGIN_SIZE}`}
        width={size}
        height={size}
        fill="none"
      >
        <path fill="transparent" d="M0 0h64v64H0z" />
        <path
          fill={fill}
          fillRule="evenodd"
          d="M32.312 7.992a3.51 3.51 0 1 0-4.964-4.964L1.285 29.09a4.388 4.388 0 0 0 0 6.206l26.063 26.062a3.51 3.51 0 0 0 4.964-4.964l-22.96-22.96a1.755 1.755 0 0 1 0-2.482l22.96-22.96Z"
          clipRule="evenodd"
        />
        <path
          fill={fill}
          d="M7.836 32.138a3.51 3.51 0 0 1 3.51-3.51h50.021A2.633 2.633 0 0 1 64 31.261v1.755a2.633 2.633 0 0 1-2.633 2.633H11.346a3.51 3.51 0 0 1-3.51-3.51Z"
        />
      </svg>
    </button>
  );
};
export default BackwardIcon;
