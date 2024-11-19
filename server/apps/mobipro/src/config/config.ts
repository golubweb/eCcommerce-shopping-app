export default () => ({
    mongoDB: {
        username:  process.env.MONGO_USER,
        password:  process.env.MONGO_PASSWORD,
        host:      process.env.MONGO_HOST,
        database:  process.env.MONGO_DATABASE_NAME
    },
    nodemailer: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "be610429300188",
            pass: "f41be224caab1e"
        }
    }
});

