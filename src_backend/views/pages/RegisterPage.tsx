import { BaseHtml } from "../components/BaseHtml";
import { Login } from "../components/Login";
import { Ribbon } from "../components/Ribbon";

export function PageRegister() {
    return <BaseHtml stylesheets={[]}>
        <body>
            <Ribbon />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Login type="register" />
            </div>
        </body>
    </BaseHtml>
}