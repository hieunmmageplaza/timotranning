import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function MultilineFieldExample() {
    const [value, setValue] = useState('');

    const handleChange = useCallback((newValue: string) => setValue(newValue), [],);

    return (<TextField
            label="Excluded pages"
            value={value}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
            helpText={<span>
              Page URLs NOT to show the pop-upp (separated by new lines)
            </span>}
        />);
}


export default MultilineFieldExample;