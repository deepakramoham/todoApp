import { memo } from "react";

const Button = memo(({ buttonText, handleClick, className }) => {
  // console.log("button rendered");

  const onButtonClick = () => {
    // console.log("button clicked");
  };

  return (
    <div>
      <button
        className={className || "btn btn-primary"}
        onClick={handleClick || onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
});

export default Button;
