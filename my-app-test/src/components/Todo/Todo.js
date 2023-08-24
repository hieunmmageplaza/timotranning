import React from 'react';

function Todo({ todo, index, completeTodo, notCompleteTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
        >
            {todo.title}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => notCompleteTodo(index)}>Not Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>

        </div>
    );
}
export default Todo;
