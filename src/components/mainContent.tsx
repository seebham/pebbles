import { Box, Stack, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { addItem, changeIsDone } from "../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MainContent = () => {
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  console.log(data);
  return (
    <Box sx={{ flex: 1 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        {data &&
          data.map((category: CategoriesType) => {
            return (
              <Item key={category.name}>
                <Box
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "sm",
                  }}
                >
                  {category.name}
                </Box>
                {/* <Box sx={{ fontSize: "sm" }}>{category.description}</Box> */}
              </Item>
            );
          })}
      </Stack>
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

export default MainContent;
