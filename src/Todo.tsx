import React, { useState, useCallback } from "react";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";

import TodoForm from "./TodoForm";
import { TodoType } from "./common";

import "./todo.scss";

const Todo = ({
  todo,
  onDelete,
  onUpdate,
}: {
  todo: TodoType;
  onDelete: () => void;
  onUpdate: (v: any) => void;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleUpdate = useCallback(() => {
    onUpdate(editedTodo);
    setEditMode(false);
  }, [onUpdate, setEditMode, editedTodo]);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onUpdate({ ...todo, completionDate: new Date() });
    } else {
      onUpdate({ ...todo, completionDate: null });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  const todoClasses = () => {
    let classes = "todo ";
    if (todo.completionDate) {
      classes += "todo--complete";
    }
    return classes;
  };

  return (
    <div className={todoClasses()}>
      {editMode ? (
        <div className="todo_edit">
          <TodoForm
            setTodo={setEditedTodo}
            todo={editedTodo}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleUpdate} data-testid="save-button">
            Save
          </Button>
        </div>
      ) : (
        <>
          <div className="todo_action-container todo_action-container--left">
            <Checkbox
              onChange={handleCheckChange}
              checked={todo.completionDate !== null}
              style={{ color: "#2980b9" }}
              inputProps={{
                //@ts-ignore
                "data-testid": "complete-checkbox",
              }}
            />
          </div>
          <TodoForm disabled todo={todo} />
          <div className="todo_action-container">
            <Delete
              className="todo_action"
              onClick={onDelete}
              data-testid="delete-button"
            />
            {!todo.completionDate && (
              <Edit
                className="todo_action"
                onClick={() => setEditMode(true)}
                data-testid="edit-button"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
