import BaseDialog from "./baseDialog";
import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
  Control,
} from "react-hook-form";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";

import { addItem, editItem } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/store";

interface IFormInput extends TodoItemType {
  option?: string;
}

const DialogContent = ({
  type,
  category,
  item,
  control,
  handleSubmit,
}: {
  type: "add" | "edit";
  category: string;
  item?: TodoItemType;
  control: Control<IFormInput, object>;
  handleSubmit: UseFormHandleSubmit<IFormInput>;
}) => {
  const dispatch = useAppDispatch();
  const onAddSubmit: SubmitHandler<IFormInput> = (data) => {
    let newItem: TodoItemType = {
      ...data,
      id: new Date().valueOf(),
      isDone: false,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    };
    dispatch(addItem({ category: category, item: newItem }));
  };
  return (
    <form onSubmit={handleSubmit(onAddSubmit)}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        p={2}
      >
        <Controller
          name="title"
          control={control}
          defaultValue={type === "edit" ? item && item.title : ""}
          render={({ field }) => (
            <Input
              required
              placeholder={type === "edit" ? item && item.title : "Task Title"}
              {...field}
            />
          )}
        />
        <Controller
          name="desc"
          control={control}
          defaultValue={type === "edit" ? item && item.desc : ""}
          render={({ field }) => (
            <Input
              required
              placeholder={
                type === "edit" ? item && item.desc : "Task Description"
              }
              multiline
              minRows={2}
              maxRows={4}
              {...field}
            />
          )}
        />
        <Controller
          name="due_date"
          control={control}
          defaultValue={type === "edit" ? item && item.desc : ""}
          render={({ field }) => (
            <Input
              required
              type="date"
              placeholder={
                type === "edit" ? item && item.due_date : "Task Due Date"
              }
              {...field}
            />
          )}
        />
        <input className=".MuiButton" type="submit" />
      </Stack>
    </form>
  );
};

interface AddEditTDialogType {
  type: "add" | "edit";
  category: string;
  open: boolean;
  handleClose: () => void;
  item?: TodoItemType;
}

const AddEditTDialog = ({
  type,
  category,
  open,
  handleClose,
  item,
}: AddEditTDialogType) => {
  const { control, handleSubmit } = useForm<IFormInput>();
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      title={type === "edit" ? `Edit ${item && item.title}` : `Add new Task`}
      dialogContent={
        type === "edit" ? (
          <DialogContent
            category={category}
            type={type}
            item={item}
            control={control}
            handleSubmit={handleSubmit}
          />
        ) : (
          <DialogContent
            category={category}
            type={type}
            control={control}
            handleSubmit={handleSubmit}
          />
        )
      }
    />
  );
};
export default AddEditTDialog;
