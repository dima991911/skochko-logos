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
    FETCH_PROJECTS: 'FETCH_PROJECTS',
};

export function createProject(project) {
    return { type: ProjectType.CREATE_PROJECT, project };
}

export function fetchProjects(projects) {
    return { type: ProjectType.FETCH_PROJECTS, projects }
}
