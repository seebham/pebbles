import { Box, Grid } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../store/store";
import Category, { PsuedoCategory } from "./category";
import { addItem, removeItem } from "../store/dataSlice";

const CategoryContainer = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  console.log(data);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    let category = data.findIndex(
      (c: CategoriesType) => c.name === result.source.droppableId
    );
    if (category !== -1) {
      let ToDoItem = data[category].items[result.source.index];
      dispatch(
        removeItem({
          categoryName: result.source.droppableId,
          itemID: ToDoItem.id,
        })
      );
      dispatch(
        addItem({
          category: result.destination.droppableId,
          item: ToDoItem,
          atIndex: result.destination.index,
        })
      );
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
        >
          {data &&
            data.map((category: CategoriesType) => {
              return (
                <Grid item xs={3} key={category.name}>
                  <Category {...category} />
                </Grid>
              );
            })}
          <Grid item xs={3}>
            <PsuedoCategory />
          </Grid>
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default CategoryContainer;
