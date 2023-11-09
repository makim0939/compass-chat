import React from "react";
import styles from "./icon.module.scss";
const ORIGIN_SIZE = 64;

const AddIcon = ({
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
        <rect width={62} height={7.467} x={1} y={28.8} fill={fill} rx={3.733} />
        <rect
          width={64}
          height={7.483}
          x={28.793}
          y={64}
          fill={fill}
          rx={3.741}
          transform="rotate(-90 28.793 64)"
        />
      </svg>
    </button>
  );
};

export default AddIcon;
