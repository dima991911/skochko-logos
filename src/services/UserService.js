import { config } from "../config";
import { backendRequestsErrorHandler } from "../helpers/helpers";

class UserService {
    static async login(user) {
        return fetch(`${config.api}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then(res => {
            if (res.status !== 200) {
                return backendRequestsErrorHandler(res);
            } else {
                return res.json();
            }
        });
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static removeToken() {
        localStorage.removeItem('token');
    }
}

export { UserService };
