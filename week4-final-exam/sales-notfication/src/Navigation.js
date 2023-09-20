import {Frame, Navigation} from '@shopify/polaris';
import {HomeMinor, NotificationMajor, SettingsMajor} from '@shopify/polaris-icons';
import React from 'react';

function NavigationE({children}) {
    return (
        <Frame navigation={<Navigation location="/">
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
        </Navigation>}>
            {children}
        </Frame>
    );
}


export default NavigationE;