import express from 'express'
import { isAuthenticated, isAuthorised } from '../Middlewares/Auth.js';
import { DeleteApplication, GetEmployerAllApplication, GetJonSeekerAllApplication, PostApplication } from '../Controllers/ApplicationController.js';
const applicationRouter = express.Router();

applicationRouter.post("/post-application/:id",isAuthenticated,isAuthorised("Job Seeker"),PostApplication)
applicationRouter.get("/get-all-employer-applications",isAuthenticated,isAuthorised("Employer"),GetEmployerAllApplication)
applicationRouter.get("/get-all-job-seeker-applications",isAuthenticated,isAuthorised("Job Seeker"),GetJonSeekerAllApplication)
applicationRouter.delete("/delete-application",isAuthenticated,DeleteApplication)

export default applicationRouter;