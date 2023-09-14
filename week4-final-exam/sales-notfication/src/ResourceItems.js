import React, {useState} from 'react';
import {Badge, Button, ResourceItem, ResourceList, Stack} from "@shopify/polaris";

function ResourceItems({todos, setTodos}) {

    const [selectedIds, setSelectedIds] = useState([]);

    const [testItems,setTestItems] = useState([
        {
            id: 1,
            text1: 'Getting to design the',
            text2: 'Setting up the data',
            text3: 'a day ago'
        },
        {
            id: 2,
            text1: 'Getting to design the',
            text2: 'Setting up the data',
            text3: 'a day ago'
        },
        {
            id: 3,
            text1: 'Getting to design the',
            text2: 'Setting up the data',
            text3: 'a day ago'
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
            promotedBulkActions={promotedBulkActions}
            renderItem={(item) => {
                const {id, text1, text2, text3} = item;
                return (
                    <ResourceItem id={id}>
                        <div className="todo-item">
                            <div className="todo">
                                <Stack alignment="center">
                                    <Stack.Item fill>{text1}</Stack.Item>

                                    <Stack.Item>
                                            ahihi
                                    </Stack.Item>
                                </Stack>
                            </div>
                        </div>
                    </ResourceItem>
                );
            }}
        />
    );
}

export default ResourceItems;
