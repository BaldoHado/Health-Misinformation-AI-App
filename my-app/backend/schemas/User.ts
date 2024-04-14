import mongoose from "mongoose";
import { bcrypt } from 'bcrypt';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	hash: {
		type: String,
		required: true,
	},
    tokenRegisteredWith: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export async function findUserByEmail(email: string) {
    return User.findOne({ email });
}

export async function createUser(firstName: string, lastName: string, email: string, password: string, tokenRegisteredWith: string) {
    const hash = bcrypt.hashSync(password, 10);
    const user = new User({ firstName, lastName, email, hash, tokenRegisteredWith });
    user.save();
    return user;
}

export default User;
