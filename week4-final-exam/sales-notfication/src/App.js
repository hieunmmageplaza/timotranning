import './App.css';
import {AppProvider, Card, DisplayText, Layout, Page, Tabs} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useCallback, useState} from "react";
import TopBarE from "./TopBarE";
import NavigationE from "./Navigation";
import ResourceItems from "./ResourceItems";
import PaginationExample from "./Pagination";
import SelectExample from "./SelectInput";
import MultilineFieldExample from "./TextField";
import CheckboxExample from "./CheckBox";
import RangeSliderExample from "./RangeSlider";

function App() {
    const [selected, setSelected] = useState(0);

    const tabs = [
        {
            id: 'display-tab',
            content: 'Display',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'triggers-tab',
            content: 'Triggers',
            panelID: 'accepts-marketing-content-1',
        }
    ];

    const handleTabChange = useCallback(
        (selectedTabIndex: number) => setSelected(selectedTabIndex),
        [],
    );

    return (
        <AppProvider i18n={en}>
            <TopBarE/>
            <Page title="Home" fullWidth>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <DisplayText size="large">Notifications</DisplayText>
                            <DisplayText size="small">List of sales notification from Shopify</DisplayText>
                            <ResourceItems/>
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card>
                            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                                <Card.Section>
                                    {selected === 0 &&
                                        <React.Fragment>
                                            <DisplayText size="small">APPREARANCE</DisplayText>
                                            <p> Destktop Position</p>
                                            <CheckboxExample label="Hide time ago" checked={false}/>
                                            <br/>
                                            <CheckboxExample label="Truncate content text" checked={true}
                                                             helpText="If your product name is long for one line, it will be truncated to 'Prodcut na...'"/>
                                            <DisplayText size="small">TIMING</DisplayText>
                                            <div className="custom-range-slider">
                                                <RangeSliderExample label="Display duration"
                                                                    helpText="How long each pop will display on your page"
                                                                    type="second(s)"/>
                                            </div>
                                            <div className="custom-range-slider">
                                                <RangeSliderExample label="Time before the firt pop"
                                                                    helpText="The delay time before the first notification"
                                                                    type="second(s)"/>

                                            </div>
                                            <div className="custom-range-slider">
                                                <RangeSliderExample label="Gap time between two pops"
                                                                    helpText="The time interval between two popup notifications"
                                                                    type="second(s)"/>

                                            </div>
                                            <div className="custom-range-slider">
                                                <RangeSliderExample label="Maximum of popups"
                                                                    helpText="The maximum number of popups are allowed to show after..."
                                                                    type="pop(s)"/>
                                            </div>

                                        </React.Fragment>
                                    }
                                    {selected === 1 && (
                                        <React.Fragment>
                                            <SelectExample/>
                                            <MultilineFieldExample/>
                                        </React.Fragment>
                                    )}
                                </Card.Section>
                            </Tabs>
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

