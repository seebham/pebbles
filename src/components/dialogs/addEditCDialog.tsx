import BaseDialog from "./baseDialog";

import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { addCategory, editCategory } from "../../store/dataSlice";

const DialogContent = ({
  type,
  inputRef,
  categoryID,
}: {
  type: "add" | "edit";
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>;
  categoryID?: string;
}) => {
  return (
    <>
      <TextField
        autoFocus
        required
        id="outlined-required"
        label={type === "edit" ? "Rename Category" : "Category Name"}
        helperText={
          type === "edit"
            ? "Please enter the new name"
            : "Please enter a category name"
        }
        name="categoryName"
        defaultValue={type === "edit" ? categoryID : ""}
        size="small"
        inputRef={inputRef}
      />
    </>
  );
};

const DialogActions = ({
  type,
  categoryID,
  categoryName,
  handleClose,
}: {
  type: "add" | "edit";
  categoryID: string;
  categoryName: React.MutableRefObject<HTMLInputElement | undefined>;
  handleClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const handleCreateCategory = () => {
    if (categoryName.current) {
      let newCategory = categoryName.current.value;
      if (newCategory.length <= 0) return;
      dispatch(addCategory({ name: newCategory }));
      handleClose();
    }
  };
  const handleEditCategory = () => {
    if (categoryName.current) {
      let newCategory = categoryName.current.value;
      if (newCategory.length <= 0 || newCategory === categoryID) return;
      dispatch(editCategory({ name: categoryID, newName: newCategory }));
      handleClose();
    }
  };

  return (
    <Button
      autoFocus
      onClick={type === "edit" ? handleEditCategory : handleCreateCategory}
    >
      {type === "edit" ? "Rename" : "Create"}
    </Button>
  );
};

interface PropsType {
  type: "add" | "edit";
  open: boolean;
  handleClose: () => void;
  categoryID?: string;
}

const AddEditCDialog = ({ type, open, handleClose, categoryID }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>();
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={type === "edit" ? `Rename '${categoryID}'` : `Create new Category`}
      dialogContent={
        <DialogContent
          type={type}
          inputRef={inputRef}
          categoryID={categoryID}
        />
      }
      dialogActions={
        <DialogActions
          type={type}
          categoryID={categoryID ? categoryID : ""}
          categoryName={inputRef}
          handleClose={handleClose}
        />
      }
    />
  );
};
export default AddEditCDialog;
