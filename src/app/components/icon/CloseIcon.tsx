import React from "react";
import styles from "./icon.module.scss";
const CloseIcon = ({
  fill = "#D9D9D9",
  size = 36,
  onClick,
}: {
  fill: string;
  size: number;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.container} style={{ width: size, height: size }}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
      >
        <rect
          width={81.192}
          height={9.317}
          y={57.412}
          fill={fill}
          rx={4.659}
          transform="rotate(-45 0 57.412)"
        />
        <rect
          width={81.192}
          height={9.317}
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
