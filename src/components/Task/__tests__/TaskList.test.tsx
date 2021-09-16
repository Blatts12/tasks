import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import TaskList from "../TaskList";

const MockTheme = ({ children }: any) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

test("renders component", async () => {
  const { getByText } = render(
    <MockTheme>
      <TaskList />
    </MockTheme>
  );

  expect(getByText("Tasks")).toBeInTheDocument();
});
