import mongoose, { Schema, Document } from "mongoose";


export interface MessageProps extends Document {
    content: string;
    createdAt: Date
}
export interface UserProps extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages: MessageProps[];

}

const MessageSchema: Schema<MessageProps> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})
const UserSchema: Schema<UserProps> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "verify code is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code expiry is required"]
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages:[MessageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<UserProps>) || mongoose.model<UserProps>("User", UserSchema)

export default UserModel;