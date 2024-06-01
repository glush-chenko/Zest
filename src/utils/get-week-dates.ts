import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export const getWeekDates = () => {
    const startOfWeek = dayjs().startOf('day').weekday(1);
    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = startOfWeek.add(i, 'day');
        dates.push(date);
    }

    return dates;
}