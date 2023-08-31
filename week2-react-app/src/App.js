import './App.css';
import {
    AppProvider,
    Avatar, Badge,
    Button,
    Card, Checkbox,
    ChoiceList, Form,
    Layout,
    Page,
    ResourceItem,
    ResourceList
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useCallback, useState} from "react";
import TodoResourceList from "./TodoResourceList";
import './App.css';
import CreateToDo from "./CreateToDo";
import TopBarE from "./TopBarE";

function App() {
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
        {
            id: '201',
            name: 'Set Ahihi',
            isComplete: false
        },
    ]);

    return (
        <AppProvider i18n={en}>
            <Page title={'To-Dos'}>
                <Layout>
                    <Layout.Section>
                        <TopBarE/>
                        <CreateToDo/>
                        <Card>
                            <Form>
                                <h2>Showing {todos.length} todos</h2>
                                <TodoResourceList todos={todos} setTodos={setTodos}/>
                            </Form>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </AppProvider>
  );
}

export default App;
