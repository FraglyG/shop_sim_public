"use strict";
document.addEventListener("DOMContentLoaded", function () {
    // HANDLE LOGIN BUTTON CLICK
    var loginButton = document.querySelector(".main_ribbon_login");
    if (!loginButton)
        return;
    loginButton.style.display = "block";
    loginButton.addEventListener("click", function () {
        // Could be done better but i don't have time rn
        window.location.href = "/?login=true";
    });
});
