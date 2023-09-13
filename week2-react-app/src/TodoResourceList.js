import React, {useState} from 'react';
import {Badge, Button, ResourceItem, ResourceList, Stack} from "@shopify/polaris";

function TodoResourceList({todos, setTodos}) {

    const [selectedIds, setSelectedIds] = useState([]);

    const handleComplete = (todoId) => {
        setTodos((todos) => {
                todos.map((todo) =>
                    todo.id === todoId ? {...todo, isComplete: true} : todo
                )
            }
        );
    };

    const handleRemove = (todoId) => {
        setTodos((todos) => todos.filter(({ id }) => id !== todoId));
    };

    const removeSelected = () => {
        setTodos((todos) => todos.filter((todo) => !selectedIds.includes(todo.id)));
        setSelectedIds([]);
    };

    const completeSelected = () => {
        setTodos((todos) => {
            const updatedTodos = todos.map((todo) =>
                selectedIds.includes(todo.id) ? { ...todo, isComplete: true } : todo
            );
            setSelectedIds([]);
            return updatedTodos;
        });
    };

    const promotedBulkActions = [
        {
            content: 'Complete',
            onAction: completeSelected,
        },
        {
            content: 'Remove',
            onAction: removeSelected,
        },
    ];

    return (
            <ResourceList
                items={todos}
                selectedItems = {selectedIds}
                onSelectionChange = {setSelectedIds}
                promotedBulkActions = {promotedBulkActions}
                renderItem={(item) => {
                    const {id, name, isComplete} = item;
                    return (
                        <ResourceItem id={id}>
                            <div className="todo-item">
                                <div className="todo" style={{textDecoration: isComplete ? "line-through" : ""}}>
                                    <Stack alignment="center">
                                        <Stack.Item fill>{name}</Stack.Item>
                                        <Stack.Item>
                                            <Badge status={isComplete ? 'success' : ''}>
                                                {isComplete ? 'Done' : 'Pending'}
                                            </Badge>
                                        </Stack.Item>
                                        <Stack.Item>
                                            {!isComplete && (
                                                <Button onClick={() => handleComplete(id)}>Complete</Button>
                                            )}
                                        </Stack.Item>
                                        <Stack.Item>
                                            <Button destructive onClick={() => handleRemove(id)}>Remove</Button>
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
