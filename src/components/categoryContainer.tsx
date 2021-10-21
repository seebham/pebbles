import { Box, Grid, Button } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../store/store";
import Category, { PsuedoCategory } from "./category";
import { addItem, removeItem, addDummyData } from "../store/dataSlice";

const CategoryContainer = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  console.log(data);

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;
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
          spacing={{ xs: 2, sm: 2, md: 4 }}
          alignItems={{ xs: "center", sm: "flex-start" }}
        >
          {data &&
            data.map((category: CategoriesType) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={category.name}
                  zeroMinWidth
                >
                  <Category {...category} />
                </Grid>
              );
            })}
          <Grid item xs={3}>
            <PsuedoCategory />
          </Grid>
        </Grid>
      </DragDropContext>
      <Box>
        <Button onClick={() => dispatch(addDummyData())}>
          ..or try with Dummy Data
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryContainer;
