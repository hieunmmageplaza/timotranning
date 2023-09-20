import {Card, FormLayout, Frame, Layout, Navigation, Page, SkeletonPage, TextField} from '@shopify/polaris';
import {HomeMinor, NotificationMajor, SettingsMajor} from '@shopify/polaris-icons';
import React, {useCallback, useState} from 'react';

function NavigationE({children}) {
    const [isLoading, setIsLoading] = useState(false);

    const toggleIsLoading = useCallback(
        () => setIsLoading((isLoading) => !isLoading),
        [],
    );
    const loadingPageMarkup = (
        <SkeletonPage>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        ahihi
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
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

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;


    return (
        <Frame navigation={<Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        label: 'Home',
                    },
                    {
                        label: 'Notifications',
                        onClick: toggleIsLoading,
                    },
                    {
                        label: 'Settings',
                    },
                ]}
            />
        </Navigation>}>
            {children}
        </Frame>
    );
}


export default NavigationE;