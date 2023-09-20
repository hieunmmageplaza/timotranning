import {TextField} from '@shopify/polaris';
import {useCallback, useState} from 'react';

function MultilineFieldExample({label, helpText}) {
    const [value, setValue] = useState('');

    const handleChange = useCallback((newValue: string) => setValue(newValue), [],);

    return (<TextField
        label={label}
            value={value}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
        helpText={helpText}
        />);
}


export default MultilineFieldExample;