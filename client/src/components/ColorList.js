import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({ color: "", code: { hex: "" } });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    if (colorToEdit) {
      axiosWithAuth()
        .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
          updateColors(colors.map(color => color.id === res.data.id ? color = res.data : color));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(stateColor => stateColor.id !== res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={saveEdit} type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form className="new-color-form">
        <h3>New Color</h3>
        <label>color name:
          <input
            onChange={e => setNewColor({
              ...newColor,
              name: e.target.value
            })}
            value={newColor.name}
            type="text"
            name="newcolor"/>
        </label>
        <label>hex code:
          <input
            onChange={e => setNewColor({
              ...newColor,
              code: { hex: e.target.value }
            })}
            value={newColor.code.hex}
            type="text"
            name="newhex"/>
        </label>
      </form> */}
    </div>
  );
};

export default ColorList;
