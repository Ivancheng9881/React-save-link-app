import React from "react";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      <h1>Ivan's Link Saving React App</h1>
      <button
        onClick={() => handleToggleDarkMode((isDarkMode) => !isDarkMode)}
        className="save"
      >
        Toggle
      </button>
    </div>
  );
};

export default Header;
