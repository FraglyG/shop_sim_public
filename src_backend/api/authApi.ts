import { userModel } from "../mongo/models/user";
import { app } from "../server";
import * as bcrypt from "bcryptjs";

type LoginBody = {
    username: string;
    password: string;
}

function setSecureCookie(cookie: Record<string, any>, cookieName: string, cookieValue: string) {
    cookie[cookieName].value = cookieValue;
    cookie[cookieName].secure = false; // HTTPS Only (OFF FOR DEV)
    cookie[cookieName].httpOnly = true; // JS Prevention
    cookie[cookieName].sameSite = "strict"; // CSRF Protection
    cookie[cookieName].expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week
}

// Note: For production, consider adding rate limiting to prevent brute force attacks! :)
app.group("/auth", app =>
    app
        .post("/register", async ({ body, cookie }) => {
            const iBody = body as LoginBody;

            const username = iBody.username;
            const password = iBody.password;

            // Validate input (prevent SQL Injection, etc.)
            if (!username || !password) return { success: false, error: "Missing username or password" };
            if (typeof username != "string" || typeof password != "string") return { success: false, error: "Invalid username or password" };

            // Ensure username is unique (case insensitive)
            const userExists = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });
            if (userExists) return { success: false, error: "Username already exists" };

            // Register user
            const sessionToken = crypto.randomUUID();
            const passwordHash = await bcrypt.hash(password, 10);
            await userModel.create({ username, passwordHash, sessionToken });

            // Store Session
            setSecureCookie(cookie, "session", sessionToken);
            setSecureCookie(cookie, "username", username);

            return { success: true, username };
        })

        .post("/login", async ({ body, cookie }) => {
            const iBody = body as LoginBody;

            const username = iBody.username;
            const password = iBody.password;

            // Validate input
            if (!username || !password) return { success: false, error: "Missing username or password" };
            if (typeof username != "string" || typeof password != "string") return { success: false, error: "Invalid username or password" };

            // Check if user exists
            const user = await userModel.findOne({ username });
            if (!user) return { success: false, error: "Incorrect Username" };

            // Check password
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);
            if (!passwordMatch) return { success: false, error: "Incorrect Password" };

            // Update User Token
            const sessionToken = crypto.randomUUID();
            user.sessionToken = sessionToken;
            await user.save();

            // Store Session
            setSecureCookie(cookie, "session", sessionToken);
            setSecureCookie(cookie, "username", username);

            return { success: true, username };
        })
)