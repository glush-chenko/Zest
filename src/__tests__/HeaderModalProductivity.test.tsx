import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {HeaderModalProductivity} from "../features/header/header-modal-productivity/header-modal-productivity";
import {useAppSelector, useAppDispatch} from "../app/hooks";
import {selectTasks} from "../components/task/task-slice";
import {selectRightSection} from "../features/main/right-section/right-section-slice";
import {headerSlice, selectHeader} from "../features/header/header-slice";
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "../app/store";

jest.mock('../app/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));


describe('HeaderModalProductivity', () => {
    let navigateMock: jest.MockedFunction<NavigateFunction>;
    let locationMock: jest.MockedFunction<() => Location>;

    beforeEach(() => {
        (useAppSelector as jest.MockedFunction<typeof useAppSelector>).mockImplementation((selector) => {
            if (selector === selectTasks) {
                return {
                    tasks: [
                        { id: '1', name: 'Task 1', description: 'Description 1', completed: true, scheduledDate: 1686902400000, priority: 'high', createdAt: 1686816000000, completedAt: 1686902400000 },
                        { id: '2', name: 'Task 2', description: 'Description 2', completed: false, scheduledDate: 1686902400000, priority: 'medium', createdAt: 1686816000000 },
                        { id: '3', name: 'Task 3', description: 'Description 3', completed: false, scheduledDate: 1686815999000, priority: 'low', createdAt: 1686729600000 },
                    ],
                };
            } else if (selector === selectRightSection) {
                return { selectedDate: 1686902400000 };
            } else if (selector === selectHeader) {
                return { goalForDay: 3 };
            }
            return {};
        });

        navigateMock = jest.fn();
        (useNavigate as jest.MockedFunction<typeof useNavigate>).mockReturnValue(navigateMock);

        locationMock = jest.fn().mockReturnValue({ state: { previousRoute: '/' }, key: 'testKey' });
        (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the HeaderModalProductivity component correctly', () => {
        render(<HeaderModalProductivity />);

        expect(screen.getByText('Productivity')).toBeInTheDocument();
        expect(screen.getByText('Goal for the day')).toBeInTheDocument();
        expect(screen.getByText('Change goal')).toBeInTheDocument();
        expect(screen.getByText('Last activity of the week')).toBeInTheDocument();
        expect(screen.getByText('Task status')).toBeInTheDocument();
    });

    it('should display the bar chart with the correct data', () => {
        render(<HeaderModalProductivity />);

        expect(screen.getByText('in progress')).toBeInTheDocument();
        expect(screen.getByText('overdue')).toBeInTheDocument();
        expect(screen.getByText('completed')).toBeInTheDocument();
    });

    it('should open the HeaderModalGoal component when "Change goal" button is clicked', () => {
        const mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

        render(
            <Provider store={store}>
                <HeaderModalProductivity />
            </Provider>
        );

        //Open a modal window
        fireEvent.click(screen.getByText('Change goal'));
        expect(screen.getByText('Tasks for the day')).toBeInTheDocument();

        //Find the target input field and change its value
        const goalInput = screen.getByRole('spinbutton');
        fireEvent.change(goalInput, { target: { value: '5' } });

        //Click the "Save" button
        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        expect(mockDispatch).toHaveBeenCalledWith(headerSlice.actions.setGoalForDay(5));
    });
});
