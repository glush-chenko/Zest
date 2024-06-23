import dayjs, {Dayjs} from "dayjs";

export const formatDate = (dateInMs: number): string => {
    const date: Dayjs = dayjs(dateInMs);
    const today: Dayjs = dayjs();
    const yesterday: Dayjs = dayjs().subtract(1, 'day');


    if (date.isSame(today, 'day')) {
        return `Today, ${today.format("DD MMM")} • ${today.format("ddd")}`;
    } else if (date.isSame(yesterday, 'day')) {
        return `Yesterday, ${yesterday.format("DD MMM")} • ${yesterday.format("ddd")}`;
    } else {
        return `${date.format("DD MMM")} • ${date.format("ddd")}`;
    }
}