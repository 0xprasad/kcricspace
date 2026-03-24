module.exports = {
    apps: [
        {
            name: 'kricketers-api',
            script: 'src/server.js',
            instances: 2,
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '500M',
            env_production: {
                NODE_ENV: 'production',
                PORT: 5000,
            },
            error_file: 'logs/err.log',
            out_file: 'logs/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
    ],
};