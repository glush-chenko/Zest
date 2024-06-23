import dayjs, {Dayjs, ManipulateType} from "dayjs";
import {Task} from "../components/task/task-slice";

interface CompletedTaskInfo {
    scheduledDate: Date;
    completedTasksCount: number;
};

interface completedTasksForPreviousProps {
    tasks: Task[],
    period: ManipulateType,
    current: boolean
}

export const completedTasksForPrevious = (props: completedTasksForPreviousProps): CompletedTaskInfo[] => {
    const {tasks, period, current} = props;
    if (current) {
        const startOfCurrentPeriod = dayjs().startOf(period);
        const endOfCurrentPeriod = startOfCurrentPeriod.endOf(period);

        const currentDates: Dayjs[] = [];
        let currentDate: Dayjs = startOfCurrentPeriod;

        while (currentDate.isBefore(endOfCurrentPeriod, 'day')) {
            currentDates.push(currentDate);
            currentDate = currentDate.add(1, 'day');
        }
        currentDates.push(endOfCurrentPeriod);

        return currentDates.map((date) => ({
            scheduledDate: date.toDate(),
            completedTasksCount: tasks.filter((task) =>
                dayjs(task.completedAt).isSame(date, 'day') && task.completed
            ).length,
        }));
    } else {
        const startOfPreviousPeriod = dayjs().subtract(1, period).startOf(period);
        const endOfPreviousPeriod = startOfPreviousPeriod.endOf(period);

        const previousDates: Dayjs[] = [];
        let currentDate: Dayjs = startOfPreviousPeriod;

        while (currentDate.isBefore(endOfPreviousPeriod, 'day')) {
            previousDates.push(currentDate);
            currentDate = currentDate.add(1, 'day');
        }
        previousDates.push(endOfPreviousPeriod);

        return previousDates.map((date) => ({
            scheduledDate: date.toDate(),
            completedTasksCount: tasks.filter((task) =>
                dayjs(task.completedAt).isSame(date, 'day') && task.completed
            ).length,
        }));
    }
};