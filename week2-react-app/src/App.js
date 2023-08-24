import './App.css';
import {AppProvider, Button, Layout, Page} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
function App() {
    return (
        <AppProvider i18n={en}>
            <Page title={'todo'}>
                <Layout>
                    <Layout.Section>
                        <Button>Add product</Button>
                    </Layout.Section>
                </Layout>
            </Page>
        </AppProvider>
  );
}

export default App;
