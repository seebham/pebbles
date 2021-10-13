import { Button } from "@mui/material";
import { useAppSelector } from "./store/store";

function App() {
  const todos = useAppSelector((state) => state.todo);
  console.log(todos);
  return (
    <div className="App">
      <Button>Hey!</Button>
    </div>
  );
}

export default App;
