import { createTheme, CssBaseline } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import Navbar from "./Navbar";
import TaskList from "./Task/TaskList";

const theme = createTheme({
  palette: {
    type: "dark",
    secondary: {
      main: green[400],
    },
    error: {
      main: red[400],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar title="Tasks" />
        <TaskList />
      </div>
    </ThemeProvider>
  );
}

export default App;
