import Linking from "./Linking";
import AddLink from "./AddLink";

const ListLink = ({ links, handleAddLink, handleDeleteLink }) => {
  return (
    <div className="list-link">
      {links.map((link) => (
        <Linking
          key={link.id}
          id={link.id}
          tag={link.tag}
          text={link.text}
          date={link.date}
          handleDeleteLink={handleDeleteLink}
        />
      ))}
      <AddLink handleAddLink={handleAddLink} />
    </div>
  );
};

export default ListLink;
