import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {TaskCard} from "../../components/task/task-cards-list/task-card/task-card";
import {Provider} from "react-redux";
import {store} from '../../app/store';
import {BrowserRouter} from "react-router-dom";
import dayjs from "dayjs";

export default {
    title: "Components/TaskCard",
    component: TaskCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            //
            <Provider store={store}>
                <BrowserRouter>
                    {/*<div style={containerStyle}>*/}
                        <Story/>
                    {/*</div>*/}
                </BrowserRouter>
            </Provider>
        ),
    ],
} satisfies Meta<typeof TaskCard>

type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
    args: {
        task: {
            id: '1',
            name: 'Task 1',
            description: 'This is a task description.',
            completed: false,
            scheduledDate: dayjs().startOf('day').valueOf(),
            priority: "Priority 4",
            createdAt: Date.now(),
        },
    },
}

// export const Completed = {
//     args: {
//         task: {
//             ...Default.args?.task,
//             completed: true,
//         },
//     },
// }