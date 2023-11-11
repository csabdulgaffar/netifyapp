import { Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<TodoList />} />
      <Route path="/add" element={<TodoForm />} />
    </Routes>
  );
};

export default App;
