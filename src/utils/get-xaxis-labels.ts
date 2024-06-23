import dayjs, { Dayjs } from 'dayjs';
export const getXAxisLabels = (period: string, currentDate: Dayjs): string[] => {
    switch (period) {
        case 'week':
            return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        case 'month':
            const daysInMonth = Array.from({ length: currentDate.daysInMonth() }, (_, i) => i + 1);
            return daysInMonth.map((day) => `${day}`);
        case 'year':
            return [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
        default:
            throw new Error('Invalid period');
    }
}