export const convertTimestamp = (createdAt) => {
    return new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);
}
