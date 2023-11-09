import React from "react";
import styles from "./icon.module.scss";
const ORIGIN_SIZE = 64;

const CloseIcon = ({
  fill = "#D9D9D9",
  size = 36,
  onClick,
}: {
  fill?: string;
  size?: number;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.container} style={{ width: size, height: size }}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${ORIGIN_SIZE} ${ORIGIN_SIZE}`}
        width={size}
        height={size}
        fill="none"
      >
        <path fill="transparent" d="M0 0h64v64H0z" />
        <rect
          width={81.192}
          height={7}
          y={57.412}
          fill={fill}
          rx={4.659}
          transform="rotate(-45 0 57.412)"
        />
        <rect
          width={81.192}
          height={7}
          x={57.412}
          y={64}
          fill={fill}
          rx={4.659}
          transform="rotate(-135 57.412 64)"
        />
      </svg>
    </button>
  );
};

export default CloseIcon;
