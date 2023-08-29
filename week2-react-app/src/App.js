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

function App() {

    const [checked, setChecked] = useState(false);
    const handleChange = useCallback(
        (newChecked: boolean) => setChecked(newChecked),
        [],
    );

    return (
        <AppProvider i18n={en}>
            <Page title={'To-Dos'}>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Form>
                                <CreateToDo/>
                                <h2>Showing 3 todos</h2>
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
