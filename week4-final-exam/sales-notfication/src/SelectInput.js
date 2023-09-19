import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function SelectExample() {
    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback(
        (value: string) => setSelected(value),
        [],
    );

    const options = [
        {label: 'All Pages', value: 'allpages'},

    ];

    return (
        <Select
            label="PAGE RESTRICTION"
            options={options}
            onChange={handleSelectChange}
            value={selected}
        />
    );
}


export default SelectExample;