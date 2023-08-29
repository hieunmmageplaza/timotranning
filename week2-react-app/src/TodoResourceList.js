import React, {useState} from 'react';
import {Badge, Button, Checkbox, ResourceItem, ResourceList, Stack} from "@shopify/polaris";


function CheckboxExample({id, selected, onChange}) {
    return (
        <Checkbox
            label=""
            checked={selected}
            onChange={() => onChange(id)}
        />
    );
}

function TodoResourceList() {
    const [todos, setTodos] = useState([
        {
            id: '100',
            name: 'Create React App',
            isComplete: false
        },
        {
            id: '101',
            name: 'Get Started Immediately',
            isComplete: false
        },
        {
            id: '200',
            name: 'Selecting a template',
            isComplete: true
        },
    ]);
    const [selectedIds, setSelectedIds] = useState([]);

    const checkComplete = (todoId) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return {...todo, isComplete: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const checkRemove = (todoId) => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
    };

    const handleCheckboxChange = (todoId) => {
        if (selectedIds.includes(todoId)) {
            setSelectedIds(selectedIds.filter(id => id !== todoId));
        } else {
            setSelectedIds([...selectedIds, todoId]);
        }
    };

    const handleRemoveSelected = () => {
        const updatedTodos = todos.filter(todo => !selectedIds.includes(todo.id));
        setTodos(updatedTodos);
        setSelectedIds([]);
    };

    const handleCompleteSelected = () => {
        const updatedTodos = todos.map(todo => {
            if (selectedIds.includes(todo.id)) {
                return {...todo, isComplete: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
        setSelectedIds([]);
    };
    return (
        <ResourceList
            items={todos}
            renderItem={(item) => {
                const {id, name, isComplete} = item;

                return (
                    <ResourceItem id={id}>
                        <div className="todo-item">

                            <div className="todo" style={{textDecoration: isComplete ? "line-through" : ""}}>
                                <Stack>
                                    <Stack.Item fill>
                                        <CheckboxExample
                                            id={id}
                                            selected={selectedIds.includes(id)}
                                            onChange={handleCheckboxChange}
                                            disabled={isComplete}
                                            checked={isComplete}/>
                                        {name}
                                    </Stack.Item>
                                    <Stack.Item>
                                        {isComplete ? (
                                            <Badge status="success">Done</Badge>
                                        ) : (
                                            <Badge>Pending</Badge>
                                        )}
                                    </Stack.Item>
                                    <Stack.Item>
                                        {!isComplete && (
                                            <Button onClick={() => checkComplete(id)}>Complete</Button>
                                        )}
                                    </Stack.Item>
                                    <Stack.Item>
                                        <Button destructive onClick={() => checkRemove(id)}>Remove</Button>
                                        {selectedIds.length > 0 && (
                                            <Button onClick={handleRemoveSelected}>Remove Selected</Button>
                                        )}
                                    </Stack.Item>
                                </Stack>
                            </div>
                        </div>
                    </ResourceItem>
                );
            }}
        />
    );
}

export default TodoResourceList;