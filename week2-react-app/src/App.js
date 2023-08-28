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

function App() {

    const [checked, setChecked] = useState(false);
    const handleChange = useCallback(
        (newChecked: boolean) => setChecked(newChecked),
        [],
    );

    const [todo, setTodo] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = useCallback(() => {
        setEmail('');
        setTodo(false);
    }, []);

    return (
        <AppProvider i18n={en}>
            <Page title={'To-Dos'}>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Form onSubmit={handleSubmit}>
                                <Button>Create Todo</Button>
                                <h2>Showing 2 todos</h2>
                                <TodoResourceList/>
                            </Form>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </AppProvider>
  );
}

export default App;
