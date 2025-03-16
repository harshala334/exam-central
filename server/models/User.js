// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' }
// });

// export default mongoose.model('User', UserSchema);
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' },
    branch: String,   // 🔹 Add branch
    semester: Number  // 🔹 Add semester
});

export default mongoose.model('User', UserSchema);
