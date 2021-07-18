import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";

const ContactUserModal = ({ isOpen, handleClose, fullName, setOpen }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Direct message to
        {fullName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Say Hi, This messaage will be sent directly to {fullName}
          via email
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Message"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactUserModal;
