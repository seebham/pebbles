import { Button, Container, CssBaseline, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import MainContent from "./components/mainContent";
import { useAppSelector } from "./store/store";

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
        <Container component="main" sx={{ mt: 2 }} maxWidth="lg">
          <Button>Hey!</Button>
          <MainContent />
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
