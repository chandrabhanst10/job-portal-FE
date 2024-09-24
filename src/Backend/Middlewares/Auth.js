import jwt from "jsonwebtoken";
import { CatchAsyncErrors } from "./CatchAsyncErrors.js";
import ErrorHandler from "./ErrorHandler.js";
import { User } from "../Models/UserSchema.js";

export const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        next(new ErrorHandler("User not authenticated", 400))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_TOKEN)
    req.user = await User.findById(decoded.id);
    next()
});

export const isAuthorised = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(ErrorHandler(`${req.user.role} is not authorised for this action`))
        }
        next();
    }
}