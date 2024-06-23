import type {Meta, StoryObj} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';
import {OpenIconSpeedDial} from "../../components/generic/open-icon-speed-dial";

const meta = {
    title: 'Components/OpenIconSpeedDial',
    component: OpenIconSpeedDial,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/add-task']}>
                <Story/>
            </MemoryRouter>
        )
    ],
} satisfies Meta<typeof OpenIconSpeedDial>;

export default meta;
type Story = StoryObj<typeof OpenIconSpeedDial>;

export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story:
                    'This is the default story for the `OpenIconSpeedDial` component. It renders the speed dial with the edit icon as the open icon.',
            },
        },
    },
};
