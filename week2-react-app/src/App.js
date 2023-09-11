import './App.css';
import {AppProvider, Card, FormLayout, Layout, Modal, Page, TextField} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useCallback, useState} from "react";
import TodoResourceList from "./TodoResourceList";
import TopBarE from "./TopBarE";

function App() {
    const [todos, setTodos] = useState([
        {
            id: '1',
            name: 'Create React App',
            isComplete: false
        },
        {
            id: '2',
            name: 'Get Started Immediately',
            isComplete: false
        },
        {
            id: '3',
            name: 'Selecting a template',
            isComplete: true
        },
        {
            id: '4',
            name: 'Set Ahihi',
            isComplete: false
        },
    ]);
    const [isOpenModal, setIsOpenModal] = useState(false);
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
        <AppProvider i18n={en}>
            <TopBarE/>
            <Page
                title='Todos'
                primaryAction={{
                    content: 'Create Todo',
                    onClick: () => setIsOpenModal(true)
                }}
            >
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

                <FormLayout>
                    <Layout.Section>
                        <Card>
                            <TodoResourceList todos={todos} setTodos={setTodos}/>
                        </Card>
                    </Layout.Section>
                </FormLayout>
            </Page>
        </AppProvider>
  );
}

export default App;
