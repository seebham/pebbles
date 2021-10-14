import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../store/store";
import Category, { PsuedoCategory } from "./category";

const CategoryContainer = () => {
  const data = useAppSelector((state) => state.data);
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
              <Grid item xs={3} key={category.name}>
                <Category {...category} />
              </Grid>
            );
          })}
        <Grid item xs={3}>
          <PsuedoCategory />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryContainer;
