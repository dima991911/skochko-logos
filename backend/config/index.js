const config = {
    jwt: {
        secret: 'EF5A90CD2DFE082D6D2615BDE8F046B896DDD0278CD9EC718C99DFCA3B66E755'
    },
    bucket: {
        BUCKET_NAME: process.env.BUCKET_NAME,
        USER_KEY: process.env.USER_KEY,
        USER_SECRET: process.env.USER_SECRET,
    },
};

module.exports = config;
