import React, {useCallback, useState} from 'react';
import {Badge, Button, DisplayText, Modal, ResourceItem, ResourceList, Stack, TextField} from "@shopify/polaris";

function TodoResourceList({todos, setTodos}) {

    const [selectedIds, setSelectedIds] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [newTodoName, setNewTodoName] = useState('');

    const handleNewTodoName = useCallback((value) => {
        setNewTodoName(value);
    }, []);

    const handleAddNewTodo = () => {
        const newTodo = {
            id: todos.length + 1,
            name: newTodoName,
            isComplete: false,
        };

        setTodos([...todos, newTodo]);

        setIsOpenModal(false);
        setNewTodoName('');
    }

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
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px'}}>
                <DisplayText>
                    Todos
                </DisplayText>
                <Button primary onClick={() => setIsOpenModal(true)}>Create Todo</Button>
            </div>
            <Modal
                title="Create a new Todo"
                open={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                primaryAction={{
                    content: 'Create',
                    onAction: handleAddNewTodo,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => setIsOpenModal(false),
                    },
                ]}
            >
                <Modal.Section>
                    <TextField
                        value={newTodoName}
                        onChange={handleNewTodoName}
                        autoComplete="off"
                        label=""
                    />
                </Modal.Section>
            </Modal>
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
                                                <Button onClick={() => checkComplete(id)}>Complete</Button>
                                            )}
                                        </Stack.Item>
                                        <Stack.Item>
                                            <Button destructive onClick={() => checkRemove(id)}>Remove</Button>
                                        </Stack.Item>
                                    </Stack>
                                </div>
                            </div>
                        </ResourceItem>
                    );
                }}
            />
        </>
    );
}

export default TodoResourceList;
