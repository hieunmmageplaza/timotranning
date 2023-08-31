import {TopBar, Frame} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TopBarE() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );

    const toggleIsSecondaryMenuOpen = useCallback(
        () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
        [],
    );

    const logo = {
        width: 124,
        topBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            name="Minh Hieu"
            initials="H"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );

    const secondaryMenuMarkup = (
        <TopBar.Menu
            activatorContent={
                <span>
        </span>
            }
            open={isSecondaryMenuOpen}
            onOpen={toggleIsSecondaryMenuOpen}
            onClose={toggleIsSecondaryMenuOpen}
            actions={[
                {
                    items: [{content: 'Community forums'}],
                },
            ]}
        />
    );

    const topBarMarkup = (
        <TopBar
            userMenu={userMenuMarkup}
        />
    );

    return (
        <div style={{height: '50px'}}>
            <Frame topBar={topBarMarkup} logo={logo} />
        </div>
    );
}


export default TopBarE;