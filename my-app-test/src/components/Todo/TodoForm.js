import React, {useState} from 'react';

function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = async  e => {
        e.preventDefault();
        if (!value) return;

        const newTodo = { title: value, completed: false };

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                body: JSON.stringify(newTodo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) {
                const data = await response.json();
                addTodo(data);
                setValue("");
            } else {
                console.error("Failed to add todo.");
            }
        } catch (e) {
            console.error(e);
        }
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

export default TodoForm;
