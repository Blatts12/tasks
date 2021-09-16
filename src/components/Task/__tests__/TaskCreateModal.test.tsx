import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import TaskCreateModal from "../TaskCreateModal";
import React from "react";
import { Task } from "../../../types";
import { act } from "react-dom/test-utils";

const MockTheme = ({ children }: any) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

test("renders component", async () => {
  const createTask = (task: Task) => {};
  const openCreateRef = React.createRef<() => void | null>();

  const { getByText } = render(
    <MockTheme>
      <TaskCreateModal createTask={createTask} openCreateRef={openCreateRef} />
    </MockTheme>
  );
  act(() => {
    if (openCreateRef.current) openCreateRef.current();
  });

  expect(getByText("Create Task")).toBeInTheDocument();
});
