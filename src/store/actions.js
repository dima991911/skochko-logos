export const NewProjectType = {
    UPDATE_NEW_PROJECT: 'UPDATE_NEW_PROJECT',
};

export function updateNewProject(project) {
    return { type: NewProjectType.UPDATE_NEW_PROJECT, project };
}

export const UserType = {
    UPDATE_USER_AUTH: 'UPDATE_USER_AUTH',
};

export function updateUserAuth(isAuth) {
    return { type: UserType.UPDATE_USER_AUTH, isAuth };
}

export const ProjectType = {
    CREATE_PROJECT: 'CREATE_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT',
    FETCH_PROJECTS: 'FETCH_PROJECTS',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
};

export function createProject(project) {
    return { type: ProjectType.CREATE_PROJECT, project };
}

export function fetchProjects(projects) {
    return { type: ProjectType.FETCH_PROJECTS, projects };
}

export function deleteProject(id) {
    return { type: ProjectType.DELETE_PROJECT, id };
}

export function updateProject(project) {
    return { type: ProjectType.UPDATE_PROJECT, project };
}
