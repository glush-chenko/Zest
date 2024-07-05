export enum ActivityEventType {
    ALL = 'all',
    ADDED = 'added',
    UPDATED = 'updated',
    DELETED = 'deleted',
    COMPLETED = 'completed',
}

export const ActivityEventTypeText = {
    [ActivityEventType.ALL]: 'All',
    [ActivityEventType.ADDED]: 'Added',
    [ActivityEventType.UPDATED]: 'Updated',
    [ActivityEventType.DELETED]: 'Deleted',
    [ActivityEventType.COMPLETED]: 'Completed',
};