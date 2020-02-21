import React, { Component } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export class Item extends Component {
  render() {
    return (
      <div>
        <p>
          item 1
          <button style={editStyle}>
            <EditIcon />
          </button>
          <button style={deleteStyle}>
            <DeleteIcon />
          </button>
        </p>
      </div>
    );
  }
}

const editStyle = {
  background:'#FFFFFF'
}

const deleteStyle = {
  background: "#FFFFFF",
  color: "#ff0000",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right"
};

export default Item;
