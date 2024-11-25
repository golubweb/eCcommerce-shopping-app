import { Injectable }    from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private _mailerService: MailerService) {}

    async sendResetPasswordEmail(_email: string, _resetToken: string) {
        let resetURL: string = `${process.env.FRONTEND_URL}/reset-password/?token=${_resetToken}`;

        await this._mailerService.sendMail({
            to:       _email,
            from:     'noreply@mobipro.com',
            subject:  'Password reset Request',
            text:     'reset-password',
            html:     `<p>You requested a password reset. Click the link to reset your password:</p><p><a href="${resetURL}">${resetURL}</a></p>`
        })
        .then(() => console.log('Email sent:', resetURL))
        .catch(() => console.log('Email not sent: ', resetURL));
    }
}
