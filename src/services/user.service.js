const api = 'http://localhost:8080/api';

class UserService {
    static login(login, password) {
        return fetch(`${api}/login`, {
            method: 'POST',
            body: JSON.stringify({ login, password }),
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json());
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }
}

export default UserService;
