import {Task} from "../components/task/task-slice";

export const sortTasksByPriority = (tasks: Task[]) => {
    const sortedTasks = []
    //     .filter(task => task.priority === '1')
    //     .concat(
    //         [...tasks].filter(task => task.priority === '2'),
    //         [...tasks].filter(task => task.priority === '3'),
    //         [...tasks].filter(task => task.priority === '4')
    //     );

    sortedTasks.push(...tasks.filter(task => task.priority === '4'));
    sortedTasks.push(...tasks.filter(task => task.priority === '3'));
    sortedTasks.push(...tasks.filter(task => task.priority === '2'));
    sortedTasks.push(...tasks.filter(task => task.priority === '1'));
    return sortedTasks;
}