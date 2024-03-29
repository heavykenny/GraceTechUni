export class UserModel {
    constructor({ createdAt, displayName, email, phoneNumber, photoURL, role, studentId, uid, updatedAt, courseUid }) {
        this.displayName = displayName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
        this.photoURL = photoURL || 'https://i.imgur.com/7k12EPD.png';
        this.role = role || 'student';
        this.studentId = studentId || null;
        this.uid = uid || '';
        this.courseUid = courseUid || null;
        this.createdAt = createdAt ? new Date(createdAt) : new Date();
        this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    // Serialize the user object to JSON
    static toJSON(userModel) {
        return {
            displayName: userModel.displayName,
            email: userModel.email,
            phoneNumber: userModel.phoneNumber,
            photoURL: userModel.photoURL,
            role: userModel.role,
            studentId: userModel.studentId,
            uid: userModel.uid,
            courseUid: userModel.courseUid,
            createdAt: userModel.createdAt,
            updatedAt: userModel.updatedAt
        };
    }

    // Deserialize JSON to a UserModel object
    static fromJSON(json) {
        return new UserModel(json);
    }
}

export default UserModel;
