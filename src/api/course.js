import api from '@/utils/api';

// Course APIs
export const fetchCourse = async () => {
    try {
        const response = await api.get('/course/');
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching courses:", error);
        throw error;
    }
}

export const fetchCourseById = async (courseId) => {
    try {
        const response = await api.get(`/course/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching course by Id:", error);
        throw error;
    }
}

export const deleteCourseById = async (courseId) => {
    try {
        const response = await api.delete(`/course/delete/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting course by Id:", error);
        throw error;
    }
}

export const updateCourseById = async (courseId, updatedData) => {
    try {
        const response = await api.put(`/course/update/${courseId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating course:", error.response?.data || error.message);
        throw error;
    }
}

export const createCourse = async (courseName) => {
    try {
        const response = await api.post('/course/create', { courseName });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating course:", error);
        throw error;
    }
}

export const createContent = async (courseId) => {
    try {
        const response = await api.post(`/course/create-content/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating content:', error);
        throw error;
    }
}

export const uploadFileToCourse = async (courseId, file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post(
            `/course/upload-file/${courseId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error uploading file:", error);
        throw error;
    }
}

// Assignment APIs
export const fetchAssignment = async () => {
    try {
        const response = await api.get('/assignment');
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching assignments:", error);
        throw error;
    }
}

export const createAssignment = async (courseId) => {
    try {
        const response = await api.post('/assignment/create', {
            courseId,
            assignmentName: "New assignment",
            description: "Empty",
            status: "Todo",
            startDate: "",
            endDate: ""
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating assignment:", error);
        throw error;
    }
}

export const updateAssignment = async (assignmentId, assignmentName, description, status, startDate, endDate) => {
    try {
        const response = await api.put(`/assignment/update/${assignmentId}`, {
            assignmentName,
            description,
            status,
            startDate,
            endDate
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error updating assignment:", error);
        throw error;
    }
}

export const deleteContentInCourse = async (courseId, contentId) => {
    try {
        const response = await api.delete(`/course/delete-content/${courseId}/${contentId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting content:", error);
        throw error;
    }
}

export const deleteFileInCourse = async (courseId, fileId) => {
    try {
        const response = await api.delete(`/course/delete-file/${courseId}/${fileId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting file:", error);
        throw error;
    }
}

export const deleteAssignment = async (assignmentId) => {
    try {
        const response = await api.delete(`/assignment/delete/${assignmentId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting assignment:", error);
        throw error;
    }
}