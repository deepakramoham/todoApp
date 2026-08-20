import { memo } from "react";
import styles from "./Input.module.css";

const Input = memo(
  ({ inputRef, name, type, value, placeholder, handleInputChange, error }) => {
    // console.log("input rendered");

    const onInputChange = (e) => {
      // console.log(e.target.value);
    };
    return (
      <div style={{ flex: 1 }}>
        <input
          ref={inputRef || null}
          name={name || ""}
          type={type}
          value={value || ""}
          placeholder={placeholder || ""}
          onChange={handleInputChange || onInputChange}
          className={styles["custom-input"]}
        />

        <div
          style={{
            fontSize: "11px",
            color: "red",
            textAlign: "center",
            height: "15px",
          }}
        >
          {error || ""}
        </div>
      </div>
    );
  },
);

export default Input;
