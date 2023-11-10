import React from "react";
import styles from "./button.module.scss";

const Button = ({
  value,
  type = "button",
  disabled = false,
  onClick = () => {},
}: {
  value: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
};

export default Button;
