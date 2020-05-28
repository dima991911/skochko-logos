import React, { useState } from "react";
import "./Login.css";

import UserService from "../../services/user.service";

function Login({ history }) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const loginToSite = () => {
        UserService.login(login, password).then(res => {
            if (res.token) {
                UserService.setToken(res.token);
                history.push('/');
            } else {
                setError(true);
                setTimeout(() => setError(false), 3000);
            }
        });
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

                {
                    error && (
                        <div className="error-container">
                            User not found
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default Login;
