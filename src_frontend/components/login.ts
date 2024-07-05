// CHECK IF LOGIN POPUP:
document.addEventListener("DOMContentLoaded", () => {
    const login = new URLSearchParams(window.location.search).get("login");

    if (!login) return;

    const loginPopup = document.querySelector(".login_form_container") as HTMLDivElement | undefined;
    if (!loginPopup) return;

    loginPopup.style.display = "block";
})

// HANDLE LOGIN FORMS
const loginForms = document.querySelectorAll('.login_form');
loginForms.forEach(form => {
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const type = (form.querySelector('.login_form_type') as HTMLInputElement).innerHTML;
        const username = (form.querySelector('.login_form_username') as HTMLInputElement).value;
        const password = (form.querySelector('.login_form_password') as HTMLInputElement).value;

        const response = await fetch('/auth/' + type, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (!result.success) return alert('Login failed: ' + (result.error || 'Unknown error'));

        window.location.href = "/";
    });
});

// HANDLE BACKDROP
let backdropActive = false;

function updateBackdrop() {
    console.log('updateBackdrop', backdropActive);
    const loginBackdrop = document.createElement('div');
    loginBackdrop.classList.add('login_form_backdrop');

    if (backdropActive) {
        document.body.appendChild(loginBackdrop);
    } else {
        const backdrop = document.querySelectorAll('.login_form_backdrop');
        backdrop.forEach(b => b.remove());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginPopupContainers = document.querySelectorAll('.login_form_container');

    loginPopupContainers.forEach(container => {
        const div = container as HTMLDivElement;

        function checkBackdrop() {
            const displayStyle = div.style.getPropertyValue('display');
            backdropActive = displayStyle != 'none';
            updateBackdrop();
        }

        div.addEventListener("change", checkBackdrop)
        checkBackdrop();
    });
})