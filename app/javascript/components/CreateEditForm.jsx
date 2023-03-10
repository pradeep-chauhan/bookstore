import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function CreateEditForm(props) {
  const { handleClose, handleSave, handleChange, editData, formType } = props;
  return (
    <div>
      <Dialog
        open
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {formType ? "Edit Books" : "Add Books" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              onChange={handleChange}
              value={editData?.title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="isbn"
              label="ISBN"
              name="isbn"
              onChange={handleChange}
              value={editData?.isbn}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              onChange={handleChange}
              value={editData?.price}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              name="tiquantitytle"
              onChange={handleChange}
              value={editData?.quantity}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave} autoFocus>
            {formType ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
