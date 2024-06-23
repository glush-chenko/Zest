export const groupDaysIntoMonths = (daysArray: { scheduledDate: Date; completedTasksCount: number }[]) => {
    const monthlyData: { scheduledDate: Date; completedTasksCount: number }[] = [];

    for (let i = 0; i < 12; i++) {
        const daysInMonth = daysArray.slice(i * 30, (i + 1) * 30);
        const totalCompletedTasks = daysInMonth.reduce((sum, day) => sum + day.completedTasksCount, 0);

        monthlyData.push({
            scheduledDate: new Date(daysInMonth[0].scheduledDate.getFullYear(), i, 1),
            completedTasksCount: totalCompletedTasks,
        });
    }

    return monthlyData;
}