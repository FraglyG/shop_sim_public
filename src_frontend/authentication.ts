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

        alert("WOuld Redirect Now")

        window.location.href = "/";
    });
});