import { Checkbox } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function CheckboxExample({ label, checked, helpText }) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = useCallback(
        (newChecked) => {
            setIsChecked(newChecked);
        },
        []
    );

    return (
        <Checkbox
            label={label}
            checked={isChecked}
            onChange={handleChange}
            helpText={helpText}
        />
    );
}

export default CheckboxExample;
