import React from "react";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

type Todo = {
  name: string;
  dueDate: MaterialUiPickersDate | null;
  completionDate: MaterialUiPickersDate | null;
};

type Props = {
  setTodo: (t: Todo) => void;
  todo: Todo;
};

const TodoForm = ({ setTodo, todo }: Props) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: e.target.value });
  };

  const handleDueDateChange = (date: MaterialUiPickersDate) => {
    setTodo({ ...todo, dueDate: date });
  };

  return (
    <div className="todo_form">
      <TextField value={todo.name} onChange={handleNameChange} />
      <KeyboardDatePicker
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
        style={{ width: "140px" }}
      />
    </div>
  );
};

export default TodoForm;
