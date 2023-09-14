import {Frame, Navigation} from '@shopify/polaris';
import {HomeMinor, NotificationMajor, OrdersMinor, ProductsMinor, SettingsMajor} from '@shopify/polaris-icons';
import React from 'react';

function NavigationE() {
    return (
        <Frame>
            <Navigation location="/">
                <Navigation.Section
                    items={[
                        {
                            url: '#',
                            label: 'Home',
                            icon: HomeMinor,
                        },
                        {
                            url: '#',
                            excludePaths: ['#'],
                            label: 'Notifications',
                            icon: NotificationMajor,
                            badge: '15',
                        },
                        {
                            url: '#',
                            excludePaths: ['#'],
                            label: 'Settings',
                            icon: SettingsMajor,
                        },
                    ]}
                />
            </Navigation>
        </Frame>
    );
}


export default NavigationE;