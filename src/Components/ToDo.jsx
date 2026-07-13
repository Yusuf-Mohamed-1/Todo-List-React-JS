import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import TodoContext from "../Contexts/TodoContext";
import SnackbarContext from "../Contexts/SnackbarContext";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function ToDo({ todo, openDeleteDialog, openUpdateDialog }) {
  const { todos, setTodos } = useContext(TodoContext);
  const { handleShowToast, setMessage } = useContext(SnackbarContext);

  function handleCheckClick() {
    const updateCompleted = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted == false
          ? (t.isCompleted = true)
          : (t.isCompleted = false);
      }

      return t;
    });
    setTodos(updateCompleted);
    localStorage.setItem("todos", JSON.stringify(updateCompleted));

    setMessage(
      todo.isCompleted
        ? "Added to the completed tasks"
        : "Added to unfinished tasks",
    );
    handleShowToast();
  }

  function handleDeleteOpen() {
    openDeleteDialog(todo);
  }

  function handleUpdateOpen() {
    openUpdateDialog(todo);
  }

  return (
    <>
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          backgroundColor: "white",
          color: "black",
          boxShadow: "0px 7px 7px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <CardContent style={{ paddingBottom: "16px" }}>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  textTransform: "capitalize",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  textAlign: "left",
                  fontSize: 16,
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  textTransform: "capitalize",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                className="iconButton"
                aria-label="delete"
                onClick={handleCheckClick}
                style={{
                  backgroundColor:
                    todo.isCompleted == true ? "#8bc34a" : "white",
                  color: todo.isCompleted == true ? "white" : "#8bc34a",
                  border: "3px solid #8bc34a",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                onClick={handleUpdateOpen}
                style={{
                  backgroundColor: "white",
                  color: "#1769aa",
                  border: "3px solid #1769aa",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                onClick={() => {
                  handleDeleteOpen();
                }}
                style={{
                  backgroundColor: "white",
                  color: "#b23c17",
                  border: "3px solid #b23c17",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
