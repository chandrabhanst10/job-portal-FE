import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must be atleast 3 character long"],
        maxLength: [30, "Name must be atleast 30 character long"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be atleast 8 character long"],
        maxLength: [32, "Password must be atleast 32 character long"],
        select:false
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    niches: {
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String,
    },
    resume: {
        public_id: String,
        url: String,
    },
    coverLatter: {
        type: String,
        url: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

export const User = mongoose.model("User", UserSchema);