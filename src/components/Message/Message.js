import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const Message = ({ isOpen, handleClose, msg, severity, variant }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant={variant}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Message;
