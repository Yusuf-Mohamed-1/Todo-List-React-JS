import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import { useState, useEffect, useMemo, useReducer } from "react";
import Button from "@mui/material/Button";
import { useSnackbar } from "../Contexts/SnackbarContext";
import reducer from "../Reducers/todoReducer";

// My Components
import ToDo from "./ToDo";

// Transition For Dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Dialog Imports
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDoList() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [alignment, setAlignment] = useState("all");
  const [dialogTodo, setDialogTodo] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [detailsTitle, setDetailsTitle] = useState("");

  const { handleShowToast, setMessage } = useSnackbar();

  // Filtering Completes And Incompleted Tasks
  let todosToBeRendered = todos;

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const inCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  if (alignment == "completed") {
    todosToBeRendered = completedTodos;
  } else if (alignment == "incomplete") {
    todosToBeRendered = inCompletedTodos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function handleButton() {
    dispatch({
      type: "added",
      payload: { newTitle: taskTitle, newDetails: detailsTitle },
    });
    setTaskTitle("");
    setDetailsTitle("");

    setMessage("The task has been added");
    handleShowToast();
  }

  function handleChange(event) {
    setAlignment(event.target.value);
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "delete", payload: { dialogTodo } });
    setShowDeleteDialog(false);

    setMessage(`The ${dialogTodo.title} task has been deleted`);
    handleShowToast();
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({ type: "update", payload: { dialogTodo } });
    setMessage(`The task has been updated successfully`);
    handleShowToast();
    setShowUpdateDialog(false);
  }

  const todoLists = todosToBeRendered.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        openDeleteDialog={openDeleteDialog}
        openUpdateDialog={openUpdateDialog}
        dispatch={dispatch}
      />
    );
  });

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 0, overflowY: "auto", maxHeight: "90vh" }}>
          <CardContent>
            {/* Start Header */}
            <Typography gutterBottom variant="h2">
              My Tasks
              <Divider />
            </Typography>
            {/* End Header */}

            {/* Start Filter Buttons */}
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                size="small"
                style={{ fontWeight: "bold" }}
                value="all"
              >
                All
              </ToggleButton>
              <ToggleButton
                size="small"
                style={{ fontWeight: "bold" }}
                value="completed"
              >
                Completed
              </ToggleButton>
              <ToggleButton
                size="small"
                style={{ fontWeight: "bold" }}
                value="incomplete"
              >
                Incomplete
              </ToggleButton>
            </ToggleButtonGroup>
            {/*End  Filter Buttons */}

            {/* Start All ToDo */}
            {todoLists}
            {/* End All ToDo */}

            {/* Start Input and Add Button */}
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <Grid size={12}>
                <TextField
                  id="outlined-basic"
                  label="Task Title"
                  style={{ marginBottom: "15px" }}
                  fullWidth
                  value={taskTitle}
                  onChange={(event) => {
                    setTaskTitle(event.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Task Details"
                  fullWidth
                  value={detailsTitle}
                  onChange={(event) => {
                    setDetailsTitle(event.target.value);
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={taskTitle.length == 0}
                  sx={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    handleButton();
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
            {/* End Input and Add Button */}
          </CardContent>
        </Card>
      </Container>
      {/* Start Delete Modal */}
      <Dialog
        sx={{ textAlign: "left" }}
        open={showDeleteDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle
          variant="h5"
          sx={{ fontWeight: "bold", paddingBottom: "10px" }}
        >
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "10px" }}>
          <DialogContentText id="alert-dialog-slide-description">
            Once deleted, it will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Modal */}
      {/* Start Update Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        disableRestoreFocus
        // disableRestoreFocus
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            id="update-title"
            label="Update Title"
            variant="standard"
            fullWidth
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            id="update-details"
            label="Update Details"
            variant="standard"
            fullWidth
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({
                ...dialogTodo,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button type="submit" onClick={handleUpdateConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Update Dialog */}
    </>
  );
}
