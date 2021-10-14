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

const AddDialogActions = ({
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

const EditDialogActions = ({
  type,
  categoryID,
  categoryName,
}: {
  type: "add" | "edit";
  categoryID: string;
  categoryName: React.MutableRefObject<HTMLInputElement | undefined>;
}) => {
  const dispatch = useAppDispatch();
  const handleCreateCategory = () => {
    if (categoryName.current) {
      let newCategory = categoryName.current.value;
      dispatch(addCategory({ name: newCategory }));
    }
  };
  const handleEditCategory = () => {
    if (categoryName.current) {
      let newCategory = categoryName.current.value;
      dispatch(editCategory({ name: categoryID, newName: newCategory }));
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
      dialogContent={<DialogContent type={type} inputRef={inputRef} />}
      dialogActions={
        type === "add" ? (
          <AddDialogActions categoryName={inputRef} />
        ) : (
          <EditDialogActions
            type="edit"
            categoryID={categoryID ? categoryID : ""}
            categoryName={inputRef}
          />
        )
      }
    />
  );
};
export default AddEditCDialog;
