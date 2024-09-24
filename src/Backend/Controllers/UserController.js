import { CatchAsyncErrors } from "../Middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import { User } from "../Models/UserSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { Token } from '../Utils/Token.js'

export const Register = CatchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fileds are required.", 400));
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please provide your preferred job niches.", 400)
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume" }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud.", 500)
            );
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };


        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }
    const user = await User.create(userData);
    Token(user, 200, res, "User Registered")
  } catch (error) {
    next(error);
  }
});

export const Login = CatchAsyncErrors(async (req, res, next) => {
  try {
    const {
      email,
      password,
      role
    } = req.body;

    if (!email || !password || !role) {
      return next(new ErrorHandler("All fileds are required.", 400));
    }
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return next(new ErrorHandler("User not found.", 404));
    }

    const passwordMatch = await existingUser.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }


    Token(existingUser, 200, res, "User Logged In")
  } catch (error) {
    next(error);
  }
});

export const Logout = CatchAsyncErrors(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true
  }
  res.status(200).cookie("token", "", options).json({
    success: true,
    message: "Logged out successfully"
  })
});

export const GetUserProfile = CatchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user: user
  })
});

export const UpdateProfile = CatchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
    role: req.body.role,
    niches: {
      firstNiche: req.body.firstNiche,
      secondNiche: req.body.secondNiche,
      thirdNiche: req.body.thirdNiche,
    },
    coverLetter: req.body.coverLetter,
  }
  const { firstNiche, secondNiche, thirdNiche } = newUserData.niches
  if (req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
    return next(new ErrorHandler("Please select Niches", 401));
  }
  if (req.files) {
    const { resume } = req.files;
    if (resume) {
      const currentResume = req.user.resume.public_id;
      if (currentResume) {
        await cloudinary.uploader.destroy(currentResume)
      }

      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          resume.tempFilePath,
          { folder: "Job_Seekers_Resume" }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return next(
            new ErrorHandler("Failed to upload resume to cloud.", 500)
          );
        }
        newUserData.resume = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };


      } catch (error) {
        return next(new ErrorHandler("Failed to upload resume", 500));
      }
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{new : true,runValidators:true,useFindAndModify:false})
  res.status(200).json({
    success: true,
    user: user,
    message:"User data updates successfully"
  })
});

export const UpdatePassword = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const {password} = req.body;
  const passwordMatch = await user.comparePassword(password)
  if (passwordMatch === password){
    return next(new ErrorHandler("Password should not same as previous password", 400));
  }
  user.password = password
  await user.save()
  res.status(200).json({
    success: true,
    user: user,
    message:"Password update successfully"
  })
});


