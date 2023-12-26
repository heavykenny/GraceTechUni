export class UserModel {
    constructor({ createdAt, displayName, email, phoneNumber, photoURL, role, studentId, uid, updatedAt }) {
        // createdAt: 2023-12-21T22:38:01.211Z
        this.createdAt = createdAt ? new Date(createdAt) : new Date();
        this.displayName = displayName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
        this.photoURL = photoURL || 'https://i.imgur.com/7k12EPD.png';
        this.role = role || 'student';
        this.studentId = studentId || null;
        this.uid = uid || '';
        this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    // Serialize the user object to JSON
    static toJSON(userModel) {
        return {
            createdAt: userModel.createdAt,
            displayName: userModel.displayName,
            email: userModel.email,
            phoneNumber: userModel.phoneNumber,
            photoURL: userModel.photoURL,
            role: userModel.role,
            studentId: userModel.studentId,
            uid: userModel.uid,
            updatedAt: userModel.updatedAt
        };
    }

    // Deserialize JSON to a UserModel object
    static fromJSON(json) {
        return new UserModel(json);
    }
}

export default UserModel;
