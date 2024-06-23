import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TaskButtons} from "../../components/task/task-buttons/task-buttons";

const meta = {
    title: 'Components/TaskButtons',
    component: TaskButtons,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onBack: fn(),
        onNext: fn(),
        onSkip: fn(),
        addTask: fn(),
    },
} satisfies Meta<typeof TaskButtons>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currentStep: 0,
        isLastStep: false,
        disabledNext: false,
    },
};

export const DisabledNext: Story = {
    args: {
        currentStep: 1,
        isLastStep: false,
        disabledNext: true,
    },
};

export const LastStep: Story = {
    args: {
        currentStep: 2,
        isLastStep: true,
        disabledNext: false,
    },
};