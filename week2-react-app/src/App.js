import logo from './logo.svg';
import './App.css';
import {Button, Card, Layout, Page, ResourceList} from "@shopify/polaris";

function App() {
  return (
    <Page title={'todo'}>
      <Layout>
        <Layout.Section>
            <Button>Add product</Button>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default App;
