import {Select} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';
import MultilineFieldExample from "./TextField";

function SelectExample() {
    const [selected, setSelected] = useState('all-pages');

    const handleSelectChange = useCallback(
        (value: string) => setSelected(value),
        [],
    );

    const options = [
        {label: 'All Pages', value: 'all-pages'},
        {label: 'Specific pages', value: 'specific-pages'},

    ];

    return (
        <>
        <Select
            label="PAGE RESTRICTION"
            options={options}
            onChange={handleSelectChange}
            value={selected}
        />
            {selected === 'specific-pages' &&  <MultilineFieldExample label="Included pages" helpText="Page URLs to show the pop-upp (separated by new lines)"/>}
            <MultilineFieldExample label="Excluded pages" helpText="Page URLs NOT to show the pop-upp (separated by new lines)"/>

        </>
    );
}


export default SelectExample;