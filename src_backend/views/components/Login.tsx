export function Login({ type, hidden }: { type: "register" | "login", hidden?: boolean }) {
    const actionName = type[0].toUpperCase() + type.substring(1).toLowerCase();

    return (
        <div class="login_form_container" style={hidden == true ? "display: none;" : ""} >
            <p class="login_form_title">{actionName}</p>

            <form class="login_form">

                <p style="display: none;" class="login_form_type">{type}</p>
                <sl-input class="login_form_username" label="Username" placeholder="Your user name..." autofocus={true}></sl-input>
                <br />
                <sl-input class="login_form_password" type="password" placeholder="Your password..." password-toggle autofocus={false}></sl-input>

                {type == "login" ? <p>Dont have an account yet? <a href="/register">Register</a> </p> : ""}

                <sl-button type="submit">{actionName}</sl-button>
            </form>

            <script src="/dist_frontend/components/login.js"></script>
        </div >
    )
}