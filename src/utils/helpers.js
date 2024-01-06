export const convertTimestamp = (createdAt) => {
    const date = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);
    // Get the current time
    const now = new Date();
    // Calculate the difference in milliseconds
    const diffMs = now - date;
    // Convert milliseconds to minutes, hours, days
    const diffMins = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    // Convert to string format based on time difference
    if (diffDays > 0) {
        return `${diffDays}d`;
    } else if (diffHrs > 0) {
        return `${diffHrs}hr`;
    } else if (diffMins > 0) {
        return `${diffMins}min`;
    } else {
        return 'Just now';
    }
}
