import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import DateFnsUtils from "@date-io/date-fns";

import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { TodoType } from "./common";
import "./App.scss";

const initialState = (): TodoType[] => {
  const todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [blankTodo()];
  }
};

const blankTodo = (): TodoType => ({
  name: "",
  dueDate: new Date() as MaterialUiPickersDate,
  completionDate: null,
});

type Todo = {
  name: string;
  dueDate: MaterialUiPickersDate | null;
  completionDate: MaterialUiPickersDate | null;
};

function App() {
  const [todos, setTodos] = useState(initialState());
  const [todo, setTodo] = useState<TodoType>({
    name: "",
    dueDate: new Date() as MaterialUiPickersDate,
    completionDate: null,
  });

  useEffect(
    function syncUpdatesToLocalStorage() {
      const newState = JSON.stringify(todos);
      localStorage.setItem("todos", newState);
    },
    [todos]
  );

  const handleSave = () => {
    setTodos([...todos, todo]);
    setTodo(blankTodo());
  };

  const deleteIndex = (indexToDelete: number) => {
    const newState = todos.filter((val, i) => {
      return i === indexToDelete ? false : true;
    });

    setTodos(newState);
  };

  const updateIndex = (indexToUpdate: number, newTodo: TodoType) => {
    console.log("update index", newTodo);
    let newTodos = [...todos];
    newTodos[indexToUpdate] = newTodo;
    setTodos(newTodos);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <h1>OME Todo App</h1>
        <div className="todo_new">
          <TodoForm setTodo={setTodo} todo={todo} onKeyPress={handleKeyPress} />
          <div className="todo_action-container">
            <Button onClick={handleSave}>Create</Button>
          </div>
        </div>
        {todos.map((task, i) => {
          return (
            <Todo
              todo={task}
              key={i}
              onDelete={() => deleteIndex(i)}
              onUpdate={(v) => updateIndex(i, v)}
            />
          );
        })}
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
