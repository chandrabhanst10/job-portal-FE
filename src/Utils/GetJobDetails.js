import { Joblist } from './Config.js'

export const GetJobDetails = (jobId) => {
    let jobDetails =Joblist.find((job) => {
        return String(job.id) === String(jobId)
    })
    return jobDetails
}
export const GetAppliedJobDetails = (jobId) => {
    let jobDetails =Joblist.find((job) => {
        return String(job.id) === String(jobId)
    })
    return jobDetails
}
