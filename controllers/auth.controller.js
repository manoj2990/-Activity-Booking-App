const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const {JWT_SECRET_EXPIRY, JWT_SECRET,NODE_ENV} = require('../constant')

// Signup controller
exports.signup = asyncHandler(async (req, res, next) => {
    
        const { name, email, phone, password, role } = req.body;

        
        if (!name || !email || !phone || !password) {
            new ApiError(400, 'All fields are required')
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            new ApiError(409, 'Email is already registered');
        }

       
        const user = await User.create({ name, email, phone, password, role });

        
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        };

        return new ApiResponse(201, 'User created successfully', userData).send(res)
   
})


// Login controller
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }

   
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

 
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid email or password');
    }


    const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_SECRET_EXPIRY }
    );

  
    const cookieOptions = {
        httpOnly: true, 
        secure: NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 
    };

    res.cookie('accessToken', token, cookieOptions);

    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    };

    return new ApiResponse(200, 'Login successful', { user: userData ,token}).send(res);
});
