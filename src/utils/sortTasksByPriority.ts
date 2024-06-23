import {Task} from "../components/task/task-slice";

export const sortTasksByPriority = (tasks: Task[]) => {
    const sortedTasks = [];

    sortedTasks.push(...tasks.filter(task => task.priority === 'Priority 1'));
    sortedTasks.push(...tasks.filter(task => task.priority === 'Priority 2'));
    sortedTasks.push(...tasks.filter(task => task.priority === 'Priority 3'));
    sortedTasks.push(...tasks.filter(task => task.priority === 'Priority 4'));

    return sortedTasks;
}