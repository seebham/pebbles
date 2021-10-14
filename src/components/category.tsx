import {
  Paper,
  PaperProps,
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoItem from "./TodoItem";
import { useState } from "react";
import AddCDialog from "./dialogs/addCDialog";

const CategoryContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.dark}`,
  padding: theme.spacing(2),
  textAlign: "center",
  "&:focus-within": {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const Category = ({ name, items }: CategoriesType) => {
  return (
    <CategoryContainer>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          component={"h6"}
          color={"whitesmoke"}
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          {name}
        </Typography>
        <Stack spacing={1} direction={"row"}>
          <IconButton>
            <AddIcon sx={{}} />
          </IconButton>
          <IconButton>
            <EditIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>
      </Box>
      <Stack
        direction="column"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
        m={1}
      >
        {items &&
          items.map((item: TodoItemType) => {
            return <TodoItem key={item.id} item={item} />;
          })}
      </Stack>
    </CategoryContainer>
  );
};

export const PsuedoCategory = () => {
  const [triggerModel, setTriggerModel] = useState<boolean>(false);
  const handleClose = () => {
    setTriggerModel(false);
  };
  return (
    <CategoryContainer
      sx={{ border: "1px dashed", "&:hover": { border: "1px dashed" } }}
    >
      <Button color="inherit" onClick={() => setTriggerModel(true)}>
        Add Category
      </Button>
      <AddCDialog open={triggerModel} handleClose={handleClose} />
    </CategoryContainer>
  );
};

export default Category;
