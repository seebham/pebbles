import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import CategoryContainer from "./components/categoryContainer";

function App() {
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
        <Container component="main" sx={{ mt: 2 }} maxWidth="xl">
          <CategoryContainer />
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
