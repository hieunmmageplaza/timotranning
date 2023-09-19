import {Card, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function RangeSliderExample({label, helpText, type}) {
    const [rangeValue, setRangeValue] = useState(10);

    const handleRangeSliderChange = useCallback(
        (value: number) => setRangeValue(value),
        [],
    );

    return (
            <RangeSlider
                label={label}
                value={rangeValue}
                onChange={handleRangeSliderChange}
                suffix={
                    <p
                        style={{
                            minWidth: '5',
                            textAlign: 'right',
                        }}
                    >
                        {rangeValue}{type}

                    </p>
                }
                helpText={helpText}
            />
    );
}


export default RangeSliderExample;