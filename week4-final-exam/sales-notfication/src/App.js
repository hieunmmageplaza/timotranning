import './App.css';
import {
    AppProvider, Button,
    Card,
    DisplayText,
    Frame,
    Layout,
    Navigation,
    Page,
    SettingToggle,
    Tabs,
    TextStyle
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useCallback, useState} from "react";
import ResourceItems from "./ResourceItems";
import PaginationExample from "./components/Pagination";
import SelectExample from "./components/SelectInput";
import CheckboxExample from "./components/CheckBox";
import RangeSliderExample from "./components/RangeSlider";
import DisplayPositionItem from "./components/DisplayPositionItem";
import {ConversationMinor, HomeMajor, NotificationMajor, SettingsMajor} from "@shopify/polaris-icons";
import NotificationsItem from "./components/NotificationsItem";


function App() {
    const [selected, setSelected] = useState(0);
    const [enabled, setEnabled] = useState(false);
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

    const [desktopPosition,setDesktopPosition] = useState('bottom-left');
    const [hideTimeAgo,setHideTimeAgo] = useState(false);
    const [truncateProductName,setTruncateProductName] = useState(false);

    const handleTabChange = useCallback(
        (selectedTabIndex: number) => setSelected(selectedTabIndex),
        [],
    );

    // const PageContent = () => (
    //     <Page fullWidth>
    //         <Layout>
    //             <Layout.Section>
    //                 <Card>
    //                     <ResourceItems/>
    //                 </Card>
    //             </Layout.Section>
    //         </Layout>
    //         <PaginationExample/>
    //     </Page>);

    const [currentPage, setCurrentPage] = useState('actualPage');

    const navigationMarkup = (
        <Navigation>
            <Navigation.Section
                items={[
                    {
                        label: 'Home',
                        icon: HomeMajor,
                        onClick: () => setCurrentPage('actualPage'),
                    },
                    {
                        label: 'Notifications',
                        icon: NotificationMajor,
                        onClick: () => setCurrentPage('page1'),
                    },
                    {
                        label: 'Settings',
                        icon: SettingsMajor,
                        onClick: () => setCurrentPage('page3'),
                    },
                ]}
            />
        </Navigation>
    );

    const homePage = (
        <Page title="Home">
            <Layout>
                <Layout.Section>
                    <SettingToggle
                        action={{
                            content: enabled ? 'Disable' : 'Enable',
                            onAction() {
                                setEnabled(prev => !prev);
                            }
                        }}
                        enabled={enabled}
                    >
                        <TextStyle>App status is <b>{enabled ? 'enabled' : 'disabled'}</b></TextStyle>
                    </SettingToggle>
                </Layout.Section>
            </Layout>
        </Page>
    );
    const notificationPage = (
        <Page
            title="Notifications"
            subtitle="List of sales notification from Shopify">
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <ResourceItems/>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
    const handleSave = () => {
        console.log('testttttttttttttttttttttttttttt');
    };
    const settingPage = (
        <Page title="Setting"
              subtitle="Decide how your notifications will display"
              fullWidth primaryAction={{
            content: 'Save',
            onclick: handleSave
        }}>
            <Button primary onClick={handleSave}>test</Button>
            <Layout>
                <Layout.Section secondary>
                    <Card>
                        <div className="Polaris-ResourceItem">
                            <NotificationsItem text1='ahihi' text2='ahhiii2' text4='agghh3'
                                               media='https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg'/>
                        </div>
                    </Card>
                </Layout.Section>
                <Layout.Section >
                    <Card>
                        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                            <Card.Section>
                                {selected === 0 &&
                                    <React.Fragment>
                                        <DisplayText size="small">APPREARANCE</DisplayText>
                                        <p> Destktop Position</p>
                                        <div className="Polaris-DisplayPositionItem">
                                            <DisplayPositionItem/>
                                        </div>
                                        <CheckboxExample label="Hide time ago" checked={false}/>
                                        <br/>
                                        <CheckboxExample label="Truncate content text"
                                                         checked={true}
                                                         helpText="If your product name is long for one line, it will be truncated to 'Prodcut na...'"/>
                                        <DisplayText size="small">TIMING</DisplayText>
                                        <table>
                                            <tr>
                                                <td>
                                                    <div className="custom-range-slider">
                                                        <RangeSliderExample label="Display duration"
                                                                            helpText="How long each pop will display on your page"
                                                                            type="second(s)"/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="custom-range-slider">
                                                        <RangeSliderExample label="Time before the firt pop"
                                                                            helpText="The delay time before the first notification"
                                                                            type="second(s)"/>

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="custom-range-slider">
                                                        <RangeSliderExample label="Gap time between two pops"
                                                                            helpText="The time interval between two popup notifications"
                                                                            type="second(s)"/>

                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="custom-range-slider">
                                                        <RangeSliderExample label="Maximum of popups"
                                                                            helpText="The maximum number of popups are allowed to show after..."
                                                                            type="pop(s)"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </React.Fragment>
                                }
                                {selected === 1 && (
                                    <React.Fragment>
                                        <SelectExample/>
                                    </React.Fragment>
                                )}
                            </Card.Section>
                        </Tabs>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );


    const pageMarkup = (() => {
        switch (currentPage) {
            case 'actualPage':
                return homePage;
            case 'page1':
                return notificationPage;
            case 'page3':
                return settingPage;
            default:
                return currentPage;
        }
    })();

return (
        <>
        <AppProvider i18n={en}>
            {/*<TopBarE/>*/}
            {/*<NavigationE children={<PageContent/>}/>*/}
            <Frame navigation={navigationMarkup}>
                {pageMarkup}
            </Frame>
        </AppProvider>
        </>
    );
}

export default App;

