import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Delete, Edit, Save } from "@material-ui/icons";

import "./todo.scss";

const Todo = ({
  name,
  onDelete,
  onUpdate,
}: {
  name: string;
  onDelete: () => void;
  onUpdate: (name: string) => void;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);

  const handleUpdate = () => {
    onUpdate(editName);
    setEditMode(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      handleUpdate();
    }
  };

  return (
    <div className="todo">
      {editMode ? (
        <div>
          <TextField
            value={editName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
          />
          <Save className="todo_action" onClick={handleUpdate} />
        </div>
      ) : (
        <>
          <p>{name}</p>
          <Delete className="todo_action" onClick={onDelete} />
          <Edit className="todo_action" onClick={() => setEditMode(true)} />
        </>
      )}
    </div>
  );
};

export default Todo;
