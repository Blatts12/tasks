import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import TaskCard from "../TaskCard";
import { Task } from "../../../types";

const MockTheme = ({ children }: any) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

test("renders component", async () => {
  const deleteTask = (id: number) => {};
  const updateTask = (task: Task) => {};
  const task = {
    id: 1,
    title: "Title",
    done: false,
  };

  const { getByText } = render(
    <MockTheme>
      <TaskCard task={task} deleteTask={deleteTask} updateTask={updateTask} />
    </MockTheme>
  );

  expect(getByText(task.title)).toBeInTheDocument();
});
