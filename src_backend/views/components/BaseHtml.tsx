import { CONFIG } from "../../config";

function HtmlHead(props: { title?: string, children: JSX.Element | JSX.Element[] }) {
    if (!props.title) props.title = CONFIG.SITE.NAME;

    return <head>
        {/* META TAGS */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content" />

        {/* FONTS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

        {/* CSS */}
        <link rel="stylesheet" href="/public/css/global.css" />

        <link rel="stylesheet" href="/public/css/components/logo.css" />
        <link rel="stylesheet" href="/public/css/components/ribbon.css" />
        <link rel="stylesheet" href="/public/css/components/login.css" />
        <link rel="stylesheet" href="/public/css/components/checkout_item.css" />

        <link rel="stylesheet" href="/public/css/fonts/poppins.css" />

        {/* SHOELACE */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/themes/light.css" />
        <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/shoelace-autoloader.js"></script>

        {/* OTHER */}
        <link rel="icon" href="/public/logo.webp" />
        <title>{props.title}</title>

        <script>{"var exports = {}"}</script>
        <script src="/dist_frontend/global.js"></script>

        {/* EXTRA */}
        {props.children}
    </head>
}

function HtmlFooter() {
    return ""
}

export function BaseHtml(props: { children: JSX.Element | JSX.Element[], stylesheets: string[] | undefined }) {
    return <html class="sl-theme-dark">
        <HtmlHead>
            {/* AUTO IMPORT STYLESHEETS */}
            {(props.stylesheets || []).map((sheet) => <link rel="stylesheet" href={"/public/css/" + sheet} />)}
        </HtmlHead>

        {props.children}

        <HtmlFooter />
    </html>
}