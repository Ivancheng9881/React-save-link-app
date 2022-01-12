import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import SearchBar from "./components/SearchBar";
import ListLink from "./components/ListLink";
import Header from "./components/Header";

const App = () => {
  const [links, setLinks] = useState([
    {
      id: nanoid(),
      tag: "Google",
      text: "www.Google.com",
      date: "12/01/2022",
    },
    {
      id: nanoid(),
      tag: "Youtube",
      text: "www.Youtube.com",
      date: "12/01/2022",
    },
    {
      id: nanoid(),
      tag: "Duck Duck Go",
      text: "www.duckduckgo.com",
      date: "08/01/2022",
    },
    {
      id: nanoid(),
      tag: "Reddit",
      text: "www.Reddit.com",
      date: "08/01/2022",
    },
    {
      id: nanoid(),
      tag: "WayBackMachine",
      text: "www.archive.org/web/",
      date: "08/01/2022",
    },
  ]);

  const [darkMode, setDarkMode] = useState(false);
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    const savedLinks = JSON.parse(
      localStorage.getItem("react-save-link-app-data")
    );

    if (savedLinks) {
      setLinks(savedLinks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-save-link-app-data", JSON.stringify(links));
  }, [links]);

  const addLink = (text, tag) => {
    // console.log(text);
    const date = new Date();
    const newLink = {
      id: nanoid(),
      tag: tag,
      text: text,
      date: date.toLocaleDateString(),
    };
    const newLinks = [...links, newLink];
    setLinks(newLinks);
  };

  const deleteLink = (id) => {
    const newLinks = links.filter((link) => link.id !== id);
    setLinks(newLinks);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <SearchBar handleSearchTag={setSearchTag} />
        <ListLink
          links={links.filter((link) =>
            link.tag.toLowerCase().includes(searchTag)
          )}
          handleAddLink={addLink}
          handleDeleteLink={deleteLink}
        />
      </div>
    </div>
  );
};

// localStorage.clear();

export default App;
