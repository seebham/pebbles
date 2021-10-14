import BaseDialog from "./baseDialog";

import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { addCategory } from "../../store/dataSlice";

const DialogContent = ({
  inputRef,
}: {
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>;
}) => {
  return (
    <>
      <TextField
        autoFocus
        required
        id="outlined-required"
        label="Category Name"
        helperText="Please enter a category name"
        name="categoryName"
        defaultValue=""
        size="small"
        inputRef={inputRef}
      />
    </>
  );
};

const DialogActions = ({
  categoryName,
}: {
  categoryName: React.MutableRefObject<HTMLInputElement | undefined>;
}) => {
  const dispatch = useAppDispatch();
  const handleCreateCategory = () => {
    if (categoryName.current) {
      let newCategory = categoryName.current.value;
      dispatch(addCategory({ name: newCategory }));
    }
  };
  return (
    <Button autoFocus onClick={handleCreateCategory}>
      Create
    </Button>
  );
};

interface PropsType {
  open: boolean;
  handleClose: () => void;
}

const AddCDialog = ({ open, handleClose }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>();
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={`Create new Category`}
      dialogContent={<DialogContent inputRef={inputRef} />}
      dialogActions={<DialogActions categoryName={inputRef} />}
    />
  );
};
export default AddCDialog;
