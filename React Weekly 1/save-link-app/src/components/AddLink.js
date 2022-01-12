import { useState } from "react";

const AddLink = ({ handleAddLink }) => {
  const [urlText, setUrlText] = useState("");
  const [tag, setTag] = useState("");
  const characterLimit = 200;

  const handleChange = (event) => {
    // console.log(event.target.value);
    if (characterLimit - event.target.value.length >= 0) {
      setUrlText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (urlText.trim().length > 0 && tag.trim().length > 0) {
      handleAddLink(urlText, tag);
      setUrlText("");
      setTag("");
    }
  };

  const handleChangeTag = (event) => {
    setTag(event.target.value);
  };

  return (
    <div className="link new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a tag..."
        onChange={handleChangeTag}
        value={tag}
      ></textarea>
      <textarea
        rows="8"
        cols="10"
        placeholder="Paste your URL you want to save here!"
        onChange={handleChange}
        value={urlText}
      ></textarea>
      <div className="link-footer">
        <small>{characterLimit - urlText.length}</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddLink;
