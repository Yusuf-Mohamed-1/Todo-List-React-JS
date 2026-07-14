import "./App.css";
import ToDoList from "./Components/ToDoList";
import TodoContext from "./Contexts/TodoContext";
import { useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "./Contexts/SnackbarContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TodoContext.Provider value={{ todos: todos, setTodos: setTodos }}>
            <ToDoList />
          </TodoContext.Provider>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
