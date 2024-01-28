/** @format */

import { useState } from "react";

export default function ListItem(props) {
  let oweText, styles;
  if (props.owe < 0) {
    styles = { color: "red" };
    if (props.gender === "male") oweText = `He owes you ${props.owe * -1}`;
    if (props.gender === "female") oweText = `She owes you ${props.owe * -1}`;
  } else if (props.owe > 0) {
    styles = { color: "green" };
    if (props.gender === "male") oweText = `You owe him ${props.owe}`;
    if (props.gender === "female") oweText = `You owe her ${props.owe}`;
  } else {
    if (props.gender === "male") oweText = `He and you are even`;
    if (props.gender === "female") oweText = `She and you are even`;
  }

  return (
    <div
      className="list-item"
      style={{
        backgroundColor: props.gender === "male" ? "#e6ffff" : "#ffe6ff",
      }}
      onContextMenu={props.handleContextMenu}
    >
      <img
        src={props.img}
        alt={`${props.name} avatar`}
        className="item--avatar"
      />

      <div className="item--texts">
        <p className="item--name">{props.children}</p>
        <p className="item--owe" style={styles}>
          {oweText}
        </p>
      </div>

      <div>
        <button onClick={props.handleClick} className="item--button">
          {props.open ? "Close" : "Select"}
        </button>
      </div>

      {props.isMenuOpen && (
        <div className="contextMenu">
          <button onClick={props.handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
