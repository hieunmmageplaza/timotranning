import React, {useEffect, useState} from "react";
import "../client/App.css";

function Todo({ todo, index, completeTodo, notCompleteTodo, removeTodo }) {
  return (
      <div
          className="todo"
          style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.text}
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => notCompleteTodo(index)}>Not Complete</button>
          <button onClick={() => removeTodo(index)}>x</button>
        </div>

      </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
        />
      </form>
  );
}

function App() {


  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  // const [todos, setTodos] = useState([]);
  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await fetch("/api/todos");
  //       const data = await response.json();
  //       setTodos(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //
  //   fetchTodos();
  // }, []);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
//Updating To-Do Items
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const notCompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
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