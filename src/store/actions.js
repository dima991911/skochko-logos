export const NewProjectType = {
    UPDATE_NEW_PROJECT: 'UPDATE_NEW_PROJECT',
};

export function updateNewProject(project) {
    return { type: NewProjectType.UPDATE_NEW_PROJECT, project };
}
