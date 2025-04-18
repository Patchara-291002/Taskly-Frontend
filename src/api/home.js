import axios from "axios";

export const getClassToday = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/class-today`, {
            withCredentials: true,
        });
        return response.data.courses;
    } catch (error) {
        console.error("❌ Error fetching class today:", error);
        throw error;
    }
}

// Assignment Overview
export const getAssignmentToday = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/assignment/incomplete`, {
            withCredentials: true,
        });
        return response.data.assignments;
    } catch (error) {
        console.error("❌ Error fetching assignment today:", error);
        throw error;
    }
}

export const makeDoneAssignment = async (assignmentId) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/assignment/update/${assignmentId}`, {
            status: "Done"
        }, {
            withCredentials: true,
        });
        return response.data.assignment;
    } catch (error) {
        console.error("❌ Error updating assignment status:", error);
        throw error;
    }
}

export const getTaskToday = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/task/incomplete`, {
            withCredentials: true,
        });
        return response.data.tasks;
    } catch (error) {
        console.error("❌ Error fetching task today:", error);
        throw error;
    }
}

export const getProjectIdByTaskId = async (taskId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/task/project/${taskId}`, {
            withCredentials: true,
        });
        return response.data.projectId;
    } catch (error) {
        console.error("❌ Error fetching project ID by task ID:", error);
        throw error;
    }
}

export const makeDoneTask = async (taskId, projectId) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/task/done/${taskId}`, {
            projectId: projectId,
        }, {
            withCredentials: true,
        });
        return response.data.task;
    } catch (error) {
        console.error("❌ Error updating task status:", error);
        throw error;
    }
}

export const getNotification = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        throw error;
    }
}

export const searchItems = async (query) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search`, {
            params: {
                query: query
            },
            withCredentials: true,
            timeout: 5000,
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error searching items:", error);
        throw error;
    }
}