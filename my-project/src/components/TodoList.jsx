// client/src/components/TodoList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the server when the component mounts
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleTodoUpdate = async (id, updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        updatedTodo
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleTodoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <section className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-white p-4 mb-4 shadow rounded"
          >
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
            <div className="space-x-2">
              <button
                onClick={() =>
                  handleTodoUpdate(todo._id, { completed: !todo.completed })
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => handleTodoDelete(todo._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/add">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New
        </button>
      </Link>
    </section>
  );
};

export default TodoList;
