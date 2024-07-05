document.addEventListener("DOMContentLoaded", () => {
    // HANDLE LOGIN BUTTON CLICK
    const loginButton = document.querySelector(".main_ribbon_login") as HTMLButtonElement | undefined;
    if (!loginButton) return;

    loginButton.style.display = "block";

    loginButton.addEventListener("click", () => {
        // Could be done better but i don't have time rn
        window.location.href = "/?login=true";
    });
})