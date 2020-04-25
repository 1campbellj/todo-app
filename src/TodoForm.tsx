import React, { useRef, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { TodoType } from "./common";

type Props = {
  setTodo?: (t: TodoType) => void;
  todo: TodoType;
  disabled?: boolean;
  onKeyPress?: (e: React.KeyboardEvent) => void;
};

const TodoForm = ({ setTodo, todo, disabled, onKeyPress }: Props) => {
  const nameRef = useRef<HTMLInputElement>();

  useEffect(function autoFocusNameInput() {
    if (nameRef && nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setTodo) {
      setTodo({ ...todo, name: e.target.value });
    }
  };

  const handleDueDateChange = (date: MaterialUiPickersDate) => {
    if (setTodo) {
      setTodo({ ...todo, dueDate: date });
    }
  };

  return (
    <div className="todo_form">
      <TextField
        inputRef={nameRef}
        inputProps={{
          maxLength: 75,
        }}
        className="todo_name-input"
        disabled={disabled}
        value={todo.name}
        onChange={handleNameChange}
        onKeyPress={onKeyPress}
      />
      {todo.completionDate ? (
        <KeyboardDatePicker
          disabled={disabled}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Completion Date"
          value={todo.completionDate}
          onChange={handleDueDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          style={{ width: "140px", marginBottom: 0 }}
        />
      ) : (
        <KeyboardDatePicker
          disabled={disabled}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Due Date"
          value={todo.dueDate}
          onChange={handleDueDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          style={{ width: "140px", marginBottom: 0 }}
        />
      )}
    </div>
  );
};

export default TodoForm;
