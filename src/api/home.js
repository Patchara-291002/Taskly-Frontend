import api from '@/utils/api';

export const getClassToday = async () => {
    try {
        const response = await api.get('/course/class-today');
        return response.data.courses;
    } catch (error) {
        console.error("❌ Error fetching class today:", error);
        throw error;
    }
}

export const getAssignmentToday = async () => {
    try {
        const response = await api.get('/assignment/incomplete');
        return response.data.assignments;
    } catch (error) {
        console.error("❌ Error fetching assignment today:", error);
        throw error;
    }
}

export const makeDoneAssignment = async (assignmentId) => {
    try {
        const response = await api.put(`/assignment/update/${assignmentId}`, {
            status: "Done"
        });
        return response.data.assignment;
    } catch (error) {
        console.error("❌ Error updating assignment status:", error);
        throw error;
    }
}

export const getTaskToday = async () => {
    try {
        const response = await api.get('/task/incomplete');
        return response.data.tasks;
    } catch (error) {
        console.error("❌ Error fetching task today:", error);
        throw error;
    }
}

export const getProjectIdByTaskId = async (taskId) => {
    try {
        const response = await api.get(`/task/project/${taskId}`);
        return response.data.projectId;
    } catch (error) {
        console.error("❌ Error fetching project ID by task ID:", error);
        throw error;
    }
}

export const makeDoneTask = async (taskId, projectId) => {
    try {
        const response = await api.put(`/task/done/${taskId}`, {
            projectId: projectId
        });
        return response.data.task;
    } catch (error) {
        console.error("❌ Error updating task status:", error);
        throw error;
    }
}

export const getNotification = async () => {
    try {
        const response = await api.get('/notification/');
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        throw error;
    }
}

export const searchItems = async (query) => {
    try {
        const response = await api.get('/search', {
            params: { query },
            timeout: 5000,
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error searching items:", error);
        throw error;
    }
}