import { MdDeleteForever } from "react-icons/md";
import React from "react";
const Linking = ({ id, text, tag, date, handleDeleteLink }) => {
  return (
    <div className="link">
      <span>{tag}</span>
      <span>
        <a rel="external noreferrer" target="_blank" href={"https://" + text}>
          {text}
        </a>
      </span>
      <div className="link-footer">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteLink(id)}
          className="delete-icon"
          size="1.3em"
        ></MdDeleteForever>
      </div>
    </div>
  );
};

export default Linking;
