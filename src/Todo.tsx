import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { format } from "date-fns";
import TodoForm from "./TodoForm";

import "./todo.scss";
type TodoType = {
  name: string;
  dueDate: MaterialUiPickersDate | null;
  completionDate: MaterialUiPickersDate | null;
};

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

  const handleUpdate = () => {
    onUpdate(editedTodo);
    setEditMode(false);
  };

  return (
    <div className="todo">
      {editMode ? (
        <div className="todo_edit">
          <TodoForm setTodo={setEditedTodo} todo={editedTodo} />
          <Button onClick={handleUpdate}>Save</Button>
        </div>
      ) : (
        <>
          <p>{todo.name}</p>|
          <p>Due: {format(new Date(todo.dueDate as Date), "MM/dd/yyyy")}</p>
          <Delete className="todo_action" onClick={onDelete} />
          <Edit className="todo_action" onClick={() => setEditMode(true)} />
        </>
      )}
    </div>
  );
};

export default Todo;
