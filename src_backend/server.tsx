import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import Elysia, { Cookie } from "elysia";
import { CONFIG } from "./config";
import { PageHome } from "./views/pages/HomePage";
import { userModel } from "./mongo/models/user";
import { PageRegister } from "./views/pages/RegisterPage";
import { couldStartTrivia } from "typescript";
import { itemModel } from "./mongo/models/item";
import { PageItem } from "./views/pages/ItemPage";
import { PageCheckout } from "./views/pages/CheckoutPage";
import { PageBought } from "./views/pages/BoughtPage";

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

// UTIL
export async function getUserFromRequest(cookie: Record<string, Cookie<any>>) {
    const username = cookie["username"].value;
    const session = cookie["session"].value;
    if (!username || !session) return undefined;

    const user = await userModel.findOne({ username });
    if (!user || user.sessionToken !== session) return undefined;

    return user
}

// MIDDLEWARE

type RedirectType = (url: string, status?: 301 | 302 | 303 | 307 | 308 | undefined) => Response;
const isAuthenticated = async (redirect: RedirectType, cookie: Record<string, Cookie<any>>) => {
    const user = await getUserFromRequest(cookie);
    if (!user) return redirect("/?login=true");
};

// ROUTES

//, { beforeHandle: ({ cookie, redirect }) => isAuthenticated(redirect as any, cookie) }
app.get("/", async ({ cookie }) => {
    const user = await getUserFromRequest(cookie);
    return <PageHome user={user} />
})

app.get("/checkout", async ({ cookie }) => {
    const user = await getUserFromRequest(cookie);
    return <PageCheckout user={user} />
}, { beforeHandle: ({ cookie, redirect }) => isAuthenticated(redirect as any, cookie) })

app.get("/item/:itemId", async ({ params, cookie }) => {
    const item = await itemModel.findOne({ id: params.itemId })
    if (!item) return <div>Item not found</div>;

    const user = await getUserFromRequest(cookie);
    return <PageItem item={item} user={user} />
})

app.get("/purchase/success", async ({ cookie }) => {
    const user = await getUserFromRequest(cookie);
    return <PageBought user={user} />
})

app.get("/register", () => <PageRegister />)

export async function initiateServer() {
    await import("./api/itemApi");
    await import("./api/authApi");

    app.listen(CONFIG.SITE.PORT || 3000, () => {
        console.log(`Server started on port ${CONFIG.SITE.PORT || 3000}`);
    });

    return true;
}