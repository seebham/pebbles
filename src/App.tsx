import { Button, Container, CssBaseline, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useAppSelector } from "./store/store";

function App() {
  const todos = useAppSelector((state) => state.todo);
  const categories = useAppSelector((state) => state.categories);
  console.log(todos, categories);
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 2 }} maxWidth="lg">
          <Button>Hey!</Button>
        </Container>
      </Box>
    </div>
  );
}

const WrappedApp = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  );
};

export default WrappedApp;
