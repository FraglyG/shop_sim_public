import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import Elysia, { Cookie } from "elysia";
import { CONFIG } from "./config";
import { PageHome } from "./views/pages/HomePage";
import { userModel } from "./mongo/models/user";
import { PageRegister } from "./views/pages/RegisterPage";
import { couldStartTrivia } from "typescript";

export const app = new Elysia();

app.use(html())

app.use(staticPlugin({
    prefix: "/public",
    assets: "public"
}))

app.use(staticPlugin({
    prefix: "/dist_frontend",
    assets: "dist_frontend"
}))

// MIDDLEWARE

type RedirectType = (url: string, status?: 301 | 302 | 303 | 307 | 308 | undefined) => Response;
const isAuthenticated = async (redirect: RedirectType, cookie: Record<string, Cookie<any>>) => {
    const username = cookie["username"].value;
    const session = cookie["session"].value;
    if (!username || !session) return redirect("/?login=true");

    console.log(`User has session: ${username} - ${session}`)

    // ensure session is valid
    const user = await userModel.findOne({ username }); // Warning: This is not efficient, not for production
    if (!user || user.sessionToken !== session) return redirect("/?login=true");

    console.log("User is authenticated");
};

// ROUTES

//, { beforeHandle: ({ cookie, redirect }) => isAuthenticated(redirect as any, cookie) }
app.get("/", () => <PageHome />)
app.get("/register", () => <PageRegister />)

export async function initiateServer() {
    await import("./api/itemApi");
    await import("./api/authApi");

    app.listen(CONFIG.SITE.PORT || 3000, () => {
        console.log(`Server started on port ${CONFIG.SITE.PORT || 3000}`);
    });

    return true;
}