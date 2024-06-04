import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);

export const getWeekDates = () => {
    const today = dayjs();
    const weekStart = today.weekday(0);

    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = weekStart.add(i, 'day');
        dates.push(date);
    }

    return dates;
}