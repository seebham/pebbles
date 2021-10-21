import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import { Icon, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import AddEditTDialog from "./dialogs/addEditTDialog";

import { useAppDispatch } from "../store/store";
import { removeItem } from "../store/dataSlice";

const ItemContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  marginTop: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.action.focus}`,
  transition: "border 0.3s ease-in",
  "&:hover": {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
}));

const TodoItem = ({
  item,
  category,
}: {
  item: TodoItemType;
  category: string;
}) => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [triggerModel, setTriggerModel] = useState<boolean>(false);
  const handleTriggerClose = () => {
    setTriggerModel(false);
  };
  return (
    <ItemContainer
      key={item.id}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <CustomTypography
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            cursor: "pointer",
            width: "60%",
            overflowX: "hidden",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {item.title}
        </CustomTypography>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <IconButton onClick={() => setTriggerModel(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(removeItem({ categoryName: category, itemID: item.id }))
            }
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomTypography textAlign="left">{item.desc}</CustomTypography>
        {expanded ? (
          <Box mt={2}>
            <CustomTypography>
              Created: {new Date(item.created_at).toDateString()}
            </CustomTypography>
            <CustomTypography>
              Last Update: {new Date(item.updated_at).toDateString()}
            </CustomTypography>
            <CustomTypography>
              Due Date:{" "}
              <span style={{ textDecoration: "underline" }}>
                {new Date(item.due_date).toDateString()}
              </span>
            </CustomTypography>
          </Box>
        ) : null}
      </Box>
      <AddEditTDialog
        type="edit"
        open={triggerModel}
        handleClose={handleTriggerClose}
        category={category}
        item={item}
      />
    </ItemContainer>
  );
};
export default TodoItem;
