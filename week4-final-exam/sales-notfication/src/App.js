import './App.css';
import {AppProvider, Card, DisplayText, Layout, Page} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React from "react";
import TopBarE from "./TopBarE";
import NavigationE from "./Navigation";
import ResourceItems from "./ResourceItems";
import PaginationExample from "./Pagination";

function App() {

    return (
        <AppProvider i18n={en}>
            <TopBarE/>
            <Page title="Home" >
                <Layout>
                    <Layout.Section>
                        <Card>
                            <DisplayText size="large">Notifications</DisplayText>
                            <DisplayText size="small">List of sales notification from Shopify</DisplayText>
                            <ResourceItems/>
                        </Card>
                    </Layout.Section>
                </Layout>
                <PaginationExample/>
            </Page>
            <NavigationE/>
        </AppProvider>
    );
}

export default App;
