import nodemailer from 'nodemailer'
import config from '../../../Config/config';

export class MailService {
    private transporter = nodemailer.createTransport({
        service: config.mail.smtpHost, 
        auth: {
          user: config.mail.globalFrom, 
          pass: config.mail.globalPassword 
        },
      });
    constructor() {}
    public async SendMail(email: string, subject: string, message: string) {
        try {
            const mailOptions: nodemailer.SendMailOptions = {
                from: config.mail.globalFrom,
                to: email,
                subject: subject,
                html: message,
              };
              console.log("about to send mail!")
            const isMailSent = await this.transporter.sendMail(mailOptions)
            console.log(isMailSent)
            console.log("mail sent")
            if (!isMailSent) {
                return
            }
            if (isMailSent.rejected) {
                return false
            }
            return true
        } catch (error) {
            return error
        }
    }
}