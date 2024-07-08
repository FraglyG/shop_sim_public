
/*
Hendrik's note:
    This is a simple configuration file that reads environment variables
    Simple way to handle all application's configuration from one place!
*/

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

        // we don't default to anything here! (regarding USERNAME)
        // we want it to be specified by the developer
        // otherwise attackers might make use of the default value to try and get admin access in sites where the developer forgot to set this
        // AKA. Default Credentials Attack

        USERNAME: process.env.ADMIN_USERNAME, 
        
        // we don't need a password, we assume the developer will be the one to make the first account - which will be the admin account
        // they can set their own password there :D
    }
}