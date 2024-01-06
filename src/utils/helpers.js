export const convertTimestamp = (createdAt) => {
    // Check if createdAt is a string or an object with seconds and nanoseconds
    const date = typeof createdAt === 'string' ? new Date(createdAt) : new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);

    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffDays > 1) {
        return `${diffDays} days`;
    } else if (diffDays === 1) {
        return `${diffDays} day`;
    } else if (diffHrs > 1) {
        return `${diffHrs} hrs`;
    } else if (diffHrs === 1) {
        return `${diffHrs} hr`;
    } else if (diffMins > 1) {
        return `${diffMins} mins`;
    } else if (diffMins === 1) {
        return `${diffMins} min`;
    } else {
        return 'Just now';
    }
}
