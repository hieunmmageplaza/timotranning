import React, {useEffect, useState} from "react";
import "./App.css";
import Todo from "../Todo/Todo";
import TodoForm from "../Todo/TodoForm";


function App() {
  const [todos, setTodos] = useState([]);
  async function fetchTodos() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      // setTodos(data);
      setTodos([...data].splice(0, 10));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    console.log(newTodos)
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
  };

  const notCompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = false;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
              <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={completeTodo}
                  notCompleteTodo={notCompleteTodo}
                  removeTodo={removeTodo}
              />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
  );
}

export default App;