import { useState } from "react";
import { Alert } from "reactstrap";

const AddLink = ({ handleAddLink }) => {
  const [urlText, setUrlText] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const characterLimit = 200;
  const tagCharacterLimit = 50;

  const handleChange = (event) => {
    // console.log(event.target.value);
    event.preventDefault();
    if (characterLimit - event.target.value.length >= 0) {
      setUrlText(event.target.value);
      setError("");
    }
  };

  const handleSaveClick = () => {
    if (urlText.trim().length > 0 && tag.trim().length > 0) {
      handleAddLink(urlText, tag);
      setUrlText("");
      setTag("");
      setError("");
    } else {
      console.log("No input values added");
      Alert("Please input both a tag and a URL");
      setError("Please input both a tag and a URL");
    }
  };

  const handleChangeTag = (event) => {
    event.preventDefault();
    if (tagCharacterLimit - event.target.value.length >= 0) {
      setTag(event.target.value);
    }
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
      {error && (
        <div variant="danger" className="error">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddLink;
