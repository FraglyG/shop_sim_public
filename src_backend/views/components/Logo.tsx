import { CONFIG } from "../../config";

export function Logo() {
    const logoTitle = CONFIG.SITE.NAME || "Nameless";
    const logoSlogan = CONFIG.SITE.SLOGAN || "Sloganless";

    return <div class="main_logo">
        <img class="main_logo_img" src="/public/logo.webp" />
        <div class="main_logo_text">
            <p class="poppins-bold">{logoTitle}</p>
            <p class="poppins-regular">{logoSlogan}</p>
        </div>

        {/* This could be better ngl */}
        <script>{"document.querySelector('.main_logo').onclick = () => { window.location.href = '/'; }"}</script>
    </div>
}