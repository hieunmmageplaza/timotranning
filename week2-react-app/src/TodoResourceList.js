import React, {useCallback, useState} from 'react';
import {Badge, Button, ResourceItem, ResourceList, Stack} from "@shopify/polaris";

function TodoResourceList({todos, setTodos}) {

    const [selectedIds, setSelectedIds] = useState([]);

    const handleComplete = (todoId) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return {...todo, isComplete: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleRemove = (todoId) => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
    };

    const removeSelected = () => {
        const updatedTodos = todos.filter(todo => !selectedIds.includes(todo.id));
        setTodos(updatedTodos);
        setSelectedIds([]);
    };

    const completeSelected = () => {
        const updatedTodos = todos.map(todo => {

            console.log(selectedIds);
            if (selectedIds.includes(todo.id)) {
                return {...todo, isComplete: true};
            }
            return todo;
        });
        setTodos(updatedTodos);
        setSelectedIds([]);
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
                                        <Stack.Item fill>
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
