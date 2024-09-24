import crone from 'node-cron';
import { Jobs } from '../Models/JobsSchema.js'
import { User } from '../Models/UserSchema.js'
import { SendMail } from '../Utils/SendMail.js'
export const NewsLatterCrone = () => {
    crone.schedule("*/1 * * * *", async () => {
        console.log("running automation");
        const jobs = await Jobs.find({ newsLettersSent: false });
        for (let job of jobs) {
            try {
                const filteredUsers = await User.find({
                    $or: [
                        { "niches.firstNiche": job.jobNiche },
                        { "niches.secondNiche": job.jobNiche },
                        { "niches.thirdNiche": job.jobNiche },
                    ]
                })
                for(user of filteredUsers){
                    const subject = `Hot Job Alert: ${job.title} in ${job.niche} Available Now`
                    const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`
                    SendMail({
                        email: user.email,
                        subject,
                        message
                    })
                }
                job.newsLettersSent= true;
                await job.save();
            } catch (error) {
                console.log("ERROR IN NODE CRON CATCH BLOCK");
                return next
            }
        }

    })
}