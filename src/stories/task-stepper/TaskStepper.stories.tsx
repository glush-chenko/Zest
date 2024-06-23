import type { Meta, StoryObj } from '@storybook/react';
import { TaskStepper} from "../../components/task/task-stepper/task-stepper";
import {isStepOptional} from "../../utils/is-step-optional";

const meta = {
    title: 'Components/TaskStepper',
    component: TaskStepper,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof TaskStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        steps: [
            { index: 0, name: 'Describe the name of the task', completed: false  },
            { index: 1, name: 'Description, if required', completed: false  },
            { index: 2, name: 'Period of execution', completed: false },
        ],
        currentStep: 0,
    },
};

export const OptionalStep: Story = {
    args: {
        steps: [
            { index: 0, name: 'Describe the name of the task', completed: true },
            { index: 1, name: 'Description, if required', completed: false },
            { index: 2, name: 'Period of execution', completed: false },
        ],
        currentStep: 1,
    },
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the rendering of an optional step in the TaskStepper.',
            },
        },
    },
};

export const CompletedSteps: Story = {
    args: {
        steps: [
            { index: 0, name: 'Describe the name of the task', completed: true },
            { index: 1, name: 'Description, if required', completed: true },
            { index: 2, name: 'Period of execution', completed: false },
        ],
        currentStep: 2,
    },
};