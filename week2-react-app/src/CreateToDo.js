import {Button, Modal, TextContainer, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CreateToDo() {
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const activator = <Button primary onClick={handleChange}>Create Todo</Button>;

    return (
        <div>
            <Modal
                activator={activator}
                open={active}
                onClose={handleChange}
                title="Create a new todo"
                primaryAction={{
                    content: 'Create',
                    onAction: handleChange,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleChange,
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <TextField/>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    );
}


export default CreateToDo;