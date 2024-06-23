import React, {ComponentType, FC} from 'react';
import {Provider} from 'react-redux';
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskCardsList} from "../../components/task/task-cards-list/task-cards-list";
import {store} from "../../app/store";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import type {Meta, StoryObj} from "@storybook/react";
import * as TaskCardStories from "../task-сard/TaskCard.stories";
import {Task, TaskState} from "../../components/task/task-slice";
import dayjs from "dayjs";

interface MockstoreProps {
    taskState: any;
    children: any;
} //какие тут типы должны быть?

//Task[] не сработал к DefaultTasks
const DefaultTasks: any = [
    {...TaskCardStories.Default.args?.task, id: "1", name: 'Task 1'},
    {...TaskCardStories.Default.args?.task, id: "2", name: 'Task 2'},
    {...TaskCardStories.Default.args?.task, id: "3", name: 'Task 3'},
    {...TaskCardStories.Default.args?.task, id: "4", name: 'Task 4'},
    {...TaskCardStories.Default.args?.task, id: "5", name: 'Task 5'},
    {...TaskCardStories.Default.args?.task, id: "6", name: 'Task 6'},
];

export const MockedState: TaskState = {
    tasks: DefaultTasks,
    selectedTask: null,
    newTaskId: "",
    editingTaskId: null,
};

const Mockstore: React.FC<MockstoreProps> = ({taskState, children}) => (
    <Provider
        store={configureStore({
            reducer: {
                taskSlice: createSlice({
                    name: 'task',
                    initialState: MockedState,
                    reducers: {
                        completeTask: (state, action: PayloadAction<string>) => {
                            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
                            if (taskIndex !== -1) {
                                state.tasks[taskIndex].completed = true;
                                // state.tasks[taskIndex].completedAt = Date.now();
                                // localStorage.setItem('tasks', JSON.stringify(state.tasks));
                                //оставить ли эти строки?
                            }
                        },
                        setEditingTaskId: (state, action: PayloadAction<string | null>) => {
                            state.editingTaskId = action.payload;
                        },
                        removeTask: (state, action: PayloadAction<string>) => {
                            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
                            // localStorage.setItem('tasks', JSON.stringify(state.tasks));
                        },
                    },
                }).reducer,
                rightSectionSlice: createSlice({
                    name: "rightSectionSlice",
                    initialState: {
                        selectedDate: dayjs().startOf('day').valueOf(),
                    },
                    reducers: {
                        updateSelectedDate: (state, action: PayloadAction<number>) => {
                            state.selectedDate = action.payload;
                        },
                    },
                }).reducer,
            },
        })}
    >
        {children}
    </Provider>
);

export default {
    title: "Components/TaskCardsList",
    component: TaskCardsList,
    tags: ['autodocs'],
    excludeStories: /.*MockedState$/,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks']}>
                    <Story/>
                </MemoryRouter>
            </Provider>
        ),
    ],
    //могу ли я здесь использовать <Provider store={store}> к своему стору?
    //или нижняя запись более правильна?

    // decorators: [
    //     (Story) => (
    //         <Mockstore taskState={MockedState}>
    //              <BrowserRouter>
    //                  <Story/>
    //              </BrowserRouter>
    //         </Mockstore>),
    // ]
    //но при такой записи у меня не работает Empty реализация
} satisfies Meta<typeof TaskCardsList>

type Story = StoryObj<typeof TaskCardsList>;

export const Default = {
    decorators: [
        (Story) => (
            <Mockstore taskState={MockedState}>
                <Story/>
            </Mockstore>
        ),
    ]
} satisfies Meta<typeof TaskCardsList>


export const Empty = {
    args: {
        tasks: [],
    }
}

// export const Loading  = {
//     args: {
//         tasks: [],
//     }
// }

//const initialState: TaskState = {
//     tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
//     selectedTask: null,
//     newTaskId: "",
//     editingTaskId: null,
// };