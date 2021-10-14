import { Box, Stack, Button, Grid } from "@mui/material";
import { addItem, changeIsDone } from "../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import Category, { PsuedoCategory } from "./category";

const CategoryContainer = () => {
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  console.log(data);
  return (
    <Box sx={{ flex: 1 }}>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
      >
        {data &&
          data.map((category: CategoriesType) => {
            return (
              <Grid item xs={3}>
                <Category key={category.name} {...category} />
              </Grid>
            );
          })}
        <Grid item xs={3}>
          <PsuedoCategory />
        </Grid>
      </Grid>
      <Button
        onClick={() =>
          dispatch(
            addItem({
              item: {
                id: new Date().valueOf(),
                category: "Done",
                title: "Task1",
                desc: "New Task",
                isDone: false,
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
                due_date: new Date(2022, 1, 1).toString(),
              },
            })
          )
        }
      >
        Add Item
      </Button>
    </Box>
  );
};

export default CategoryContainer;
