import { Container, createTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Navbar from "./Navbar";
import TaskList from "./Task/TaskList";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Navbar title="Tasks" />
        <TaskList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
