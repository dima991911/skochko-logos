import React, { useState } from "react";
import "./Login.css";

function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const loginToSite = () => {
        // TODO: make request to db
    };

    return (
        <div className="login-container">
            <form className="login-form">
                <input
                    className="control-field"
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    className="control-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="form-submit-button"
                    type="button"
                    value="LOGIN"
                    disabled={login === "" || password === ""}
                    onClick={() => loginToSite()}
                />
            </form>
        </div>
    )
}

export default Login;
