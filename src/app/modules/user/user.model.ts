import { Schema, model } from 'mongoose';
import {
    TAddress,
    TFullName,
    TOrder,
    TUser,
    UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const fullName = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
    },
});

const address = new Schema<TAddress>({
    street: { type: String, required: [true, 'streets is required'], trim: true },
    city: { type: String, required: [true, 'city is required'], trim: true },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
    },
});

const order = new Schema<TOrder>({
    productName: {
        type: String,
        required: [true, 'productName is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'productName is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'productName is required'],
        trim: true,
    },
});

const userSchema = new Schema<TUser, UserModel>({
    userId: {
        type: Number,
        required: [true, 'userId is required'],
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        //required: false,
        trim: true,
    },
    fullName: {
        type: fullName,
        required: [true, 'fullName is required'],
        trim: true,
    },
    age: { type: Number, required: [true, 'age is required'], trim: true },
    email: { type: String, required: [true, 'email is required'], trim: true },
    isActive: {
        type: Boolean,
        required: [true, 'isActive is required'],
        default: true,
    },
    hobbies: {
        type: [String],
        required: [true, 'hobbies is required'],
        trim: true,
    },
    address: {
        type: address,
        required: [true, 'address is required'],
        trim: true,
    },
    orders: { type: [order] },
});

// password field Will hash 
userSchema.pre('save', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, Number(config.salt_round));
    }
    next();
});




userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId: userId });
    return existingUser;
};


userSchema.statics.passwordEncryption = async function (password: string) {
    const encryptedPassword = await bcrypt.hash(password, Number(config.salt_round));
    return encryptedPassword;
};

export const User = model<TUser, UserModel>('User', userSchema);