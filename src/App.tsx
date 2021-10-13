import { useAppSelector } from "./store/store";

function App() {
  const todos = useAppSelector((state) => state.todo);
  console.log(todos);
  return <div className="App text-2xl">Hello</div>;
}

export default App;
