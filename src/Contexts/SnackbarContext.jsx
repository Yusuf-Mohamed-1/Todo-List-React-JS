import { createContext, useContext, useState } from "react";
import MySnackbar from "../Components/MySnackbar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleShowToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <SnackbarContext.Provider value={{ handleShowToast, setMessage }}>
      <MySnackbar open={open} message={message} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
