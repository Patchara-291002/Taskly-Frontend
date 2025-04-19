import api from '@/utils/api';

// ✅ ดึงโปรเจคทั้งหมดของผู้ใช้
export const fetchProjectsByUser = async () => {
    try {
        const response = await api.get('/project/');
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
        throw error;
    }
};

// ✅ สร้างโปรเจคใหม่
export const createProject = async (projectName, startDate, dueDate) => {
    try {
        const response = await api.post('/project/create', { 
            projectName, 
            startDate, 
            dueDate 
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating project:", error);
        throw error;
    }
};

export const deleteProject = async (projectId) => {
    try {
        const response = await api.delete(`/project/delete/${projectId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting project:", error);
        throw error;
    }
};

// ✅ ดึงข้อมูลโปรเจคโดยใช้ projectId
export const fetchProjectByProjectId = async (projectId) => {
    try {
        const response = await api.get(`/project/${projectId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching project by ID:", error);
        throw error;
    }
};

// ✅ เพิ่ม User เข้าไปในโปรเจค
export const addUserToProject = async (projectId, role) => {
    try {
        const response = await api.post(`/project/${projectId}/add-user`, { role });
        return response.data;
    } catch (error) {
        console.error("❌ Error adding user to project:", error);
        throw error;
    }
};

export const createContent = async (projectId) => {
    try {
        const response = await api.post(`/project/create-content/${projectId}`);
        console.log("✅ Content created:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating content:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteContent = async (projectId, contentId) => {
    try {
        const response = await api.delete(`/project/delete-content/${projectId}/${contentId}`);
        console.log("✅ Content deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error deleting content:', error.response?.data || error.message);
        throw error;
    }
};

export const updateProjectById = async (projectId, updatedData) => {
    try {
        const response = await api.put(`/project/update/${projectId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating project:", error.response?.data || error.message);
        throw error;
    }
};

export const uploadFileToProject = async (projectId, file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post(
            `/project/upload-file/${projectId}`,
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
};

export const deleteFileFromProject = async (projectId, fileId) => {
    try {
        const response = await api.delete(`/project/delete-file/${projectId}/${fileId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting file:", error);
        throw error;
    }
};

export const createRoleToProject = async (projectId) => {
    try {
        const response = await api.post(`/project/create-role/${projectId}`, {
            name: "None",
            color: "#D6D6D6"
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error created role:", error);
        throw error;
    }
};

export const updateRole = async (projectId, roleId, name, color) => {
    try {
        const response = await api.put(`/project/update-role/${projectId}/${roleId}`, {
            name,
            color
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error updated role:", error);
        throw error;
    }
};

export const deleteRole = async (projectId, roleId) => {
    try {
        const response = await api.delete(`/project/delete-role/${projectId}/${roleId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleted role:", error);
        throw error;
    }
};

export const addPeopleToProject = async (projectId) => {
    try {
        const response = await api.put(`/project/add/${projectId}`, {});
        return response.data;
    } catch (error) {
        console.error("❌ Error added people:", error);
        throw error;
    }
};

export const updateUserRole = async (projectId, userId, roleId) => {
    try {
        const response = await api.put(`/project/user-role/${projectId}/${userId}`, { roleId });
        return response.data;
    } catch (error) {
        console.error("❌ Error updated user role:", error);
        throw error;
    }
};