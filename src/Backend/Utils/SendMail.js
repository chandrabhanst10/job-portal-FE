import nodemailer from 'nodemailer'

export const SendMail = async ({ email, subject, message }) => {
    const transporter = await nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        service: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            PASS: process.env.SMTP_PASSWORD
        }
    })
    const options = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        text: message
    }
    await transporter.sendMail(options)
} 
