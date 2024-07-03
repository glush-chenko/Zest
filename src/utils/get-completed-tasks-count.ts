import dayjs, {Dayjs, ManipulateType} from 'dayjs';
import {Task} from "../components/task/task-slice";

export const getCompletedTasksCount = (tasks: Task[], period: ManipulateType, current: boolean, total: boolean): number => {
    const today = dayjs();
    let startDate: Dayjs, endDate: Dayjs;

    startDate = current ? today.startOf(period) : today.subtract(1, period).startOf(period);
    endDate = current ? today.endOf(period) : today.subtract(1, period).endOf(period);

    if (total) {
        let maxTasksPerDay = 0;

        for (let date = startDate; date.isBefore(endDate, 'day'); date = date.add(1, 'day')) {
            const tasksForDay = tasks.filter((task) => {
                const completedAt = dayjs(task.completedAt);
                return completedAt.isSame(date, 'day') && task.completed;
            }).length;

            if (tasksForDay > maxTasksPerDay) {
                maxTasksPerDay = tasksForDay;
            }
        }

        return maxTasksPerDay;
    } else {
        return tasks.filter((task) => {
            const completedAt = dayjs(task.completedAt);
            return completedAt.isSame(startDate, 'day') || (completedAt.isAfter(startDate, 'day') && completedAt.isBefore(endDate, 'day')) && task.completed;
        }).length;
    }
}