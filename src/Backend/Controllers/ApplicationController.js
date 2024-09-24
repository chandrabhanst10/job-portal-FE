import { CatchAsyncErrors } from "../Middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import { Application } from "../Models/ApplicationSchema.js";
import { Jobs } from "../Models/JobsSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const PostApplication = CatchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const { name, email, phone, address, coverLetter, resume } = req.body;
    if (!name || !email || !phone || !address || !coverLetter) {
        return next(new ErrorHandler("All fields are required", 400))
    }
    const jobSeekerInfo = {
        id: req.user._id,
        name,
        email,
        phone,
        address,
        coverLetter,
        resume,
        role: req.user.role
    }
    const jobDetails = await Jobs.findById(id);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found", 400))
    }

    const isAppliedBefore = await Application.findOne({
        "jobInfo.jobId": id,
        "jobSeekerInfo.id": req.user._id
    });
    if (isAppliedBefore) {
        return next(new ErrorHandler("You already applied for this job", 400))
    }
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
                jobSeekerInfo.resume = {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                };


            } catch (error) {
                return next(new ErrorHandler("Failed to upload resume", 500));
            }
        }
    } else if (req.user && !req.user.resume.url) {
        return next(new ErrorHandler("Please go to your profile and upload resume", 400))
    } else {
        jobSeekerInfo.resume = {
            public_id: req.user && req.user.resume.public_id,
            url: req.user && req.user.resume.url,
        }
    }
    const employerInfo = {
        id: jobDetails.postedBy,
        role: "Employer"
    }

    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.title

    }
    console.log("@@@@@", jobInfo);

    const application = await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo
    });
    res.status(200).json({
        success: true,
        message: "You have successfully applied for this application",
        application: application
    });

});

export const GetEmployerAllApplication = CatchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
        "employerInfo.id": _id,
        "deletedBy.id": false
    });
    res.status(200).json({
        success: true,
        applications: applications
    });
});

export const GetJonSeekerAllApplication = CatchAsyncErrors(async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
        "jobSeekerInfo.id": _id,
        "jobSeeker.id": false
    });
    res.status(200).json({
        success: true,
        applications: applications
    });
})

export const DeleteApplication = CatchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Applicatio does not found", 404))
    }
    const { role } = req.user;
    switch (role) {
        case "Job Seeker":
            application.deletedBy.jobSeeker=true
            await application.save();
            break;
            case "Employer":
                application.deletedBy.employer=true
                await application.save();
                break;
            default:
                console.log("Defaiult case");
                break;
                
    }
    if(application.deletedBy.employer===true && application.deletedBy.jobSeeker===true){
        await Application.deleteOne();
    }
    res.status(200).json({
        success:true,
        message:"Application delete successfully"
    })

})