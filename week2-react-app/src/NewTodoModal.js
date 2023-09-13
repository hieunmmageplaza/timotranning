import React, {useCallback, useState} from 'react';
import {Modal, TextField} from "@shopify/polaris";

function NewTodoModal ({isOpenModal, setIsOpenModal, todos, setTodos})  {
    const [newTodoName, setNewTodoName] = useState('');

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

    const handleNewTodoName = useCallback((value) => {
        setNewTodoName(value);
    }, []);
    return (
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
    );
};

export default NewTodoModal;
