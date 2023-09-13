import './App.css';
import {AppProvider, Card, FormLayout, Layout, Page} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useState} from "react";
import TodoResourceList from "./TodoResourceList";
import TopBarE from "./TopBarE";
import NewTodoModal from "./NewTodoModal";

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
                <NewTodoModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} todos={todos} setTodos={setTodos} />
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
