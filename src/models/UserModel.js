class UserModel {
    constructor({createdAt, displayName, email, phoneNumber, photoURL, role, studentId, uid, updatedAt}) {
        this.createdAt = createdAt ? new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000) : null;
        this.displayName = displayName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
        this.photoURL = photoURL || 'https://i.imgur.com/7k12EPD.png';
        this.role = role || 'student';
        this.studentId = studentId || null;
        this.uid = uid || '';
        this.updatedAt = updatedAt ? new Date(updatedAt.seconds * 1000 + updatedAt.nanoseconds / 1000000) : null;
    }

    // Method to create a new user model from a JSON object
    static fromJSON(json) {
        return new UserModel(json);
    }

    // Add any additional methods you may need
    static toJSON(user) {
        return {
            createdAt: user.createdAt,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            role: user.role,
            studentId: user.studentId,
            uid: user.uid,
            updatedAt: user.updatedAt
        };
    }
}


// const user = UserModel.fromJSON(userJson);
// console.log(user);

export default UserModel;
