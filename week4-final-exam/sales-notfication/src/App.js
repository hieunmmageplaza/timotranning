import './App.css';
import {
    AppProvider,
    Card,
    DisplayText, Frame,
    Layout, Navigation,
    Page,
    SkeletonBodyText, SkeletonDisplayText,
    SkeletonPage,
    Tabs,
    TextContainer
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import React, {useCallback, useState} from "react";
import NavigationE from "./Navigation";
import ResourceItems from "./ResourceItems";
import PaginationExample from "./Pagination";
import SelectExample from "./SelectInput";
import CheckboxExample from "./CheckBox";
import RangeSliderExample from "./RangeSlider";
import DisplayPositionItem from "./DisplayPositionItem";
import {ConversationMinor, HomeMajor, OrdersMajor} from "@shopify/polaris-icons";

function LegacyCard(props: { sectioned: boolean, children: ReactNode }) {
    return null;
}

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

    const PageContent = () => (
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
            <PaginationExample/>
        </Page>);


    const [isLoading, setIsLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);


    const toggleIsLoading = useCallback(
        () => setIsLoading((isLoading) => !isLoading),
        [],
    );
    const toggleModalActive = useCallback(
        () => setModalActive((modalActive) => !modalActive),
        [],
    );


    const navigationMarkup = (
        <Navigation>
            <Navigation.Section
                separator
                title="Jaded Pixel App"
                items={[
                    {
                        label: 'Dashboard',
                        icon: HomeMajor,
                        onClick: toggleIsLoading,
                    },
                    {
                        label: 'Jaded Pixel Orders',
                        icon: OrdersMajor,
                        onClick: toggleIsLoading,
                    },
                ]}
                action={{
                    icon: ConversationMinor,
                    accessibilityLabel: 'Contact support',
                    onClick: toggleModalActive,
                }}
            />
        </Navigation>
    );

    const actualPageMarkup = (
        <Page title="Account">
            <Layout>
                <Layout.AnnotatedSection
                    title="Account details"
                    description="Jaded Pixel will use this as your account information."
                >
                    <Card sectioned>
                        test111
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    );

    const loadingPageMarkup = (
        <SkeletonPage>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <TextContainer>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText lines={9} />
                        </TextContainer>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;


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

