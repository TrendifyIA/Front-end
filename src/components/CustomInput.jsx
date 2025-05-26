import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomInput = ({ type = "text", placeholder = "" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const shouldFloat = isFocused || value;

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className={`
          w-full border border-gray-300 rounded px-3 pt-5 pb-2
          focus:outline-none focus:border-blue-500
          peer
        `}
      />
      {["text", "email", "password", "search", "tel", "url"].includes(type) && (
        <label
          className={`
            absolute left-3 text-gray-500 transition-all
            ${shouldFloat ? "top-1 text-xs text-blue-500" : "top-3.5 text-sm"}
            pointer-events-none
          `}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomInput;
