const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    
        const { token } = req.cookies
    
        if (!token) {
            return next(new ErrorHander('Login first to access this resource.', 401))
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await user.findById(decodedData.id);
        next()
})

// Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { // If user role is not included in the roles array
            return next(new ErrorHander(`Role (${req.user.role}) is not allowed to access this resource.`, 403))
        }
        next()
    }
}