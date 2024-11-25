import { send } from "process";

export default () => ({
    mongoDB: {
        username:  process.env.MONGO_USER,
        password:  process.env.MONGO_PASSWORD,
        host:      process.env.MONGO_HOST,
        database:  process.env.MONGO_DATABASE_NAME
    },
    mailer: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        sender: process.env.EMAIL_SENDER
    }
});

