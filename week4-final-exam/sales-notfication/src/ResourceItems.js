import React, {useState} from 'react';
import {Badge, Button, DisplayText, ResourceItem, ResourceList, Stack, Thumbnail} from "@shopify/polaris";

function ResourceItems({todos, setTodos}) {

    const [selectedIds, setSelectedIds] = useState([]);

    const [testItems,setTestItems] = useState([
        {
            id: 1,
            text1: 'Getting to design the',
            text2: 'Setting up the data',
            text3: 'From March 8 ,2021',
            media: (
                <Thumbnail
                    source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                    alt="Tucan scarf"
                />
            )
        },
        {
            id: 2,
            text1: 'Getting to design the',
            text2: 'Setting up the data',
            text3: 'From March 8 ,2021',
            media: (
                <Thumbnail
                    source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                    alt="Tucan scarf"
                />
            )
        },
        {
            id: 3,
            text1: 'Getting to design the',
            text2: 'Setting up the data',
            text3: 'From March 8 ,2021',
            media: (
                <Thumbnail
                    source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                    alt="Tucan scarf"
                />
            )
        }
    ])

    const promotedBulkActions = [
        {
            content: 'Complete',
            // onAction:
        },
        {
            content: 'Remove',
            // onAction:
        },
    ];

    return (
        <ResourceList
            items={testItems}
            promotedBulkActions
            renderItem={(item) => {
                const {id, text1, text2, text3, media } = item;
                return (
                    <ResourceItem id={id} media={media}>
                        <Stack >
                            <Stack.Item fill>
                                {text1}
                                <div>SKU: 1</div>
                                <div> a day ago</div>
                            </Stack.Item>
                            <Stack.Item>
                                {text3}
                            </Stack.Item>
                        </Stack>

                    </ResourceItem>
                );
            }}
        />
    );
}

export default ResourceItems;
