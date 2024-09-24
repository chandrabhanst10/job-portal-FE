
import { CatchAsyncErrors } from "../Middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import { Jobs } from "../Models/JobsSchema.js";

export const PostJob = CatchAsyncErrors(async (req, res, next) => {
    const {
        title,
        jobType,
        location,
        companyName,
        introduction,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsiteTitle,
        personalWebsiteUrl,
        jobNiche,
        newsLettersSent,
        jobPostedOn,
    } = req.body;
    if (
        !title ||
        !jobType ||
        !location ||
        !companyName ||
        !introduction ||
        !responsibilities ||
        !qualifications ||
        !salary ||
        !jobNiche
    ) {
        return next(new ErrorHandler("All fileds are required.", 400));
    }
    if ((personalWebsiteTitle && !personalWebsiteUrl) || (!personalWebsiteTitle && personalWebsiteUrl)) {
        return next(new ErrorHandler("Please provide personal website title and url both and lease both fields.", 400));
    }
    const postedBy = req.user._id;
    const job = await Jobs.create({
        title,
        jobType,
        location,
        companyName,
        introduction,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsite: {
            title: personalWebsiteTitle,
            url: personalWebsiteUrl,
        },
        jobNiche,
        newsLettersSent,
        jobPostedOn,
        postedBy: postedBy
    });

    res.status(200).json({
        success: true,
        message: "Job posted successfully",
        job: job
    })

})

export const AllJobs = CatchAsyncErrors(async (req, res, next) => {
    const { city, niche, search } = req.query;
    const query = {}
    if (city) {
        query.location = city;
    }
    if (niche) {
        query.jobNiche = niche;
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { companyName: { $regex: search, $options: "i" } },
            { introduction: { $regex: search, $options: "i" } },
            { jobNiche: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { location: { $regex: city, $options: "i" } },
        ]
    }
    const jobs = await Jobs.find(query);
    res.status(200).json({
        success: true,
        jobs: jobs,
        count: jobs.length
    })
});

export const MyJob = CatchAsyncErrors(async (req, res, next) => {
    const myJobs = await Jobs.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        jobs: myJobs,
        count: myJobs.length
    })
})

export const DeleteJob = CatchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const myJobs = await Jobs.findById(id);
    if (!myJobs) {
        return next(new ErrorHandler("Job not found", 404));
    }
    await Jobs.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Job deleted successfully"
    })
})

export const JobDetails = CatchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const job = await Jobs.findById(id);

    
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }
    res.status(200).json({
        success: true,
        job: job,
    })
});
