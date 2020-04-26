This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Todo App Intro

This Todo app was built on React, starting with `create-react-app` with a Typescript flag for easy Typescript setup. The advantages of this method are very fast spin-up time, and easy out of the box deployment to Heroku with a few CLI commands.

Todos can be created with a due date, and later marked complete. The completion date will be stored and displayed upon completion.

Todos are stored in the browser's `localStorage`. Todos will persist across sessions on a browser, but do not persist across browsers.

## Components

The basic layout is a top level component which controls the overall list of Todos. This top level component then delegates rendering and some actions sub-components, but the source of truth is the top level `App` component.

### App Component

This is the top level component responsible for controlling all the Todos. It persists and loads the initial state of the app from `localStorage` (if it exists). Manipulation of individual Todos is delegated to subcomponents by passing down callbacks as needed. Particularly `TodoForm` handles inputs for creating a Todo, and `Todo` handles display, update, and delete.

### TodoForm Component

The `TodoForm` component handles the inputs needed to create a new Todo, as well as some double duty to for displaying Todos. Material UI components are used to bootstrap a nice UI with little manually written CSS.

The `TodoForm` can be passed a `disable` prop which will will be passed down to the various inputs. This is a quick way to display/edit information using the same component. It also ensures that the edit/display views look very similar without any extra work.

The `TodoForm` app is used by both `App` to create a new Todo, and the `Todo` component to update existing todos. The component takes callbacks from each of these parent components to manipulate the relevant object.

### Todo Component

The `Todo` component is a thin wrapper around `TodoForm` that handles display/update (which it toggles by passing `disabled` into `TodoForm`). Additionally it handles deleting todos, marking todos complete, and the logic controlling when these actions are available.

### Tools/Libraries of note

The React Material UI library is heavily used for icons, input, and buttons.

TypeScript helped a lot in development. Typescript typings on `props` is used in place of the `PropTypes` library.

SCSS is used for styling with a slightly modified BEM syntax. In some cases minor styling is passed in directly to MUI components.

react-testing-library used for tests. Broad CRUD functionality that touches all components included in `App.test.tsx`
