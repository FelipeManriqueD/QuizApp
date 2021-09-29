import React from "react";

const TextArea = ({ onHandleChange, inputValue }) => {
  return (
    <textarea
      value={inputValue}
      onChange={onHandleChange}
      className="form__textArea"
      name="answer"
    />
  );
};

export default TextArea;
