export const CONFIG = {
    SITE: {
        NAME: process.env.SITE_TITLE || "Nameless",
        SLOGAN: process.env.SITE_SLOGAN || "Sloganless",
        PORT: process.env.PORT || 3000,
    },
    DB: {
        URL: process.env.MONGO_URL,
    },
    ADMIN: {
        USERNAME: process.env.ADMIN_USERNAME,
    }
}