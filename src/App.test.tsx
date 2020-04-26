import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  localStorage.removeItem("todos");
});

test("renders an input and a create button", () => {
  const { getByText, getByTestId, getByLabelText } = render(<App />);

  const createButton = getByText("Create");
  const nameInput = getByTestId("name-input");
  const dueDateInput = getByLabelText("Due Date");

  expect(createButton).toBeTruthy();
  expect(nameInput).toBeTruthy();
  expect(dueDateInput).toBeTruthy();
});

test("can create a todo", () => {
  const { getByText, getAllByTestId, getByTestId } = render(<App />);

  const createButton = getByText("Create");
  const nameInput = getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "stuff to do" } });
  fireEvent.click(createButton);

  const nameInputs = getAllByTestId("name-input");

  // original create form is now empty
  expect((nameInputs[0] as HTMLInputElement).value).toEqual("");
  // disabled display form is created
  expect((nameInputs[1] as HTMLInputElement).value).toEqual("stuff to do");
});

test("can delete a todo after it is created", () => {
  const { getByText, getAllByTestId, getByTestId } = render(<App />);

  const createButton = getByText("Create");
  const nameInput = getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "stuff to do" } });
  fireEvent.click(createButton);

  const deleteButton = getByTestId("delete-button");
  fireEvent.click(deleteButton);
  const nameInputs = getAllByTestId("name-input");
  expect(nameInputs.length).toEqual(1);
});

test("can edit a todo after it is created", () => {
  const { getByText, getAllByTestId, getByTestId } = render(<App />);

  const createButton = getByText("Create");
  const nameInput = getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "stuff to do" } });
  fireEvent.click(createButton);

  const editButton = getByTestId("edit-button");
  fireEvent.click(editButton);
  let nameInputs = getAllByTestId("name-input");
  const saveButton = getByTestId("save-button");
  expect(nameInputs.length).toEqual(2);
  fireEvent.change(nameInputs[1], { target: { value: "edited text" } });
  fireEvent.click(saveButton);

  nameInputs = getAllByTestId("name-input");
  expect((nameInputs[1] as HTMLInputElement).value).toEqual("edited text");
});

test("can mark todo completed", () => {
  const { getByText, getByTestId, getByLabelText } = render(<App />);

  const createButton = getByText("Create");
  const nameInput = getByTestId("name-input");
  fireEvent.change(nameInput, { target: { value: "stuff to do" } });
  fireEvent.click(createButton);

  const completeCheckbox = getByTestId("complete-checkbox");
  fireEvent.click(completeCheckbox);

  expect(getByLabelText("Completion Date")).toBeTruthy();
});
