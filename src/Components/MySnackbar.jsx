import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open, message }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
