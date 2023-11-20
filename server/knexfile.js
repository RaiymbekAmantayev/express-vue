// eslint-disable-next-line no-undef
module.exports = {

    development: {
        client: "mysql2", // Используемый клиент для MySQL
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "test"
        },
        migrations: {
            directory: "./migrations" // Путь к директории с миграциями
        }
    },

    // Оставьте остальные среды без изменений, если они не используются.
};
