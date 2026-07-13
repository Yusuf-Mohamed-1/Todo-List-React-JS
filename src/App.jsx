import "./App.css";
import ToDoList from "./Components/ToDoList";
import TodoContext from "./Contexts/TodoContext";
import { useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import MySnackbar from "./Components/MySnackbar";
import SnackbarContext from "./Contexts/SnackbarContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);

  const handleShowToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const [message, setMessage] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MySnackbar open={open} message={message} />
        <TodoContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <SnackbarContext.Provider value={{ handleShowToast, setMessage }}>
            <ToDoList />
          </SnackbarContext.Provider>
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
