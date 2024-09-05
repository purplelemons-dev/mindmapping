
export interface Project {
    name: string;
    description: string;
}

export const loadProjects = (): Project[] => {
    return JSON.parse(localStorage.getItem("projects") || "[]") as Project[];
};

export const saveProjects = (projects: Project[]): void => {
    console.log("Called saveProjects");
}
