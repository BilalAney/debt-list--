/** @format */
import { useState } from "react";
import ListItem from "./listItem";
import AddForm from "./addForm";
import "./list-style.css";

export default function List({
  data,
  current,
  handleClick,
  handleChange,
  handleSubmit,
  handleDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function openContextMenu(e, id) {
    e.preventDefault();
    setIsMenuOpen((pre) => (pre !== id ? id : ""));
  }
  const items = data.map((ele) => {
    return (
      <ListItem
        key={ele.id}
        img={ele.img}
        owe={ele.owe}
        name={ele.name}
        open={current?.id === ele.id}
        gender={ele.gender}
        handleClick={() => handleClick(ele.id)}
        handleDelete={() => handleDelete(ele.id)}
        isMenuOpen={isMenuOpen === ele.id ? true : false}
        handleContextMenu={(e) => openContextMenu(e, ele.id)}
      >
        {ele.name}
      </ListItem>
    );
  });
  return (
    <div className="left-se" onClick={() => setIsMenuOpen(false)}>
      {(data.length && <div className="the-list">{items}</div>) || (
        <p>The list is empty</p>
      )}
      <button className="add-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "New Friend"}
      </button>
      {isOpen && (
        <AddForm handleChange={handleChange} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}
