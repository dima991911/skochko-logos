import { config } from "../config";
import { backendRequestsErrorHandler } from "../helpers/helpers";
import { UserService } from "./UserService";

class ProjectService {
    static async createProject(formData) {
        return fetch(`${config.api}projects?token=${UserService.getToken()}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => {
                if (res.status !== 200) {
                    return backendRequestsErrorHandler(res);
                } else {
                    return res.json();
                }
            });
    }

    static async fetchProjects() {
        return fetch(`${config.api}projects`, {
            method: 'GET',
        })
            .then(res => {
                if (res.status !== 200) {
                    return backendRequestsErrorHandler(res);
                } else {
                    return res.json();
                }
            });
    }

    static async fetchProjectById(slug) {
        return fetch(`${config.api}projects/${slug}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.status !== 200) {
                    return backendRequestsErrorHandler(res);
                } else {
                    return res.json();
                }
            });
    }

    static async removeProject(id) {
        return fetch(`${config.api}projects/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.status !== 200) {
                    return backendRequestsErrorHandler(res);
                } else {
                    return res.json();
                }
            });
    }
}

export { ProjectService };