
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import Config         from '../../../config/config';

export default () => ({
    transport: {
        host: Config().mailer.host,
        port: Config().mailer.port,
        secure: false,
        auth: {
            user: Config().mailer.auth.user,
            pass: Config().mailer.auth.pass
        }
    },
    defaults: {
        from: '"No Reply" <noreply@example.com>'
    },
    preview: true,
    template: {
        dir: process.cwd() + './templates/',
        adapter: new PugAdapter(),
        options: {
            strict: true
        }
    }
});
