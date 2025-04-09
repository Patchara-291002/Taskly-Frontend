import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ ดึงโปรเจคทั้งหมดของผู้ใช้
export const fetchProjectsByUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/project/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
        throw error;
    }
};
// ✅ สร้างโปรเจคใหม่
export const createProject = async (projectName, startDate, dueDate) => {
    return axios.post(`${API_BASE_URL}/project/create`, { projectName, startDate, dueDate }, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error("❌ Error creating project:", error);
            throw error;
        });
};

export const deleteProject = async (projectId) => {
    return axios.delete(`${API_BASE_URL}/project/delete/${projectId}`, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error("❌ Error deleting project:", error);
            throw error;
        });
}

// ✅ ดึงข้อมูลโปรเจคโดยใช้ projectId
export const fetchProjectByProjectId = async (projectId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/project/${projectId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching project by ID:", error);
        throw error;
    }
};

// ✅ เพิ่ม User เข้าไปในโปรเจค
export const addUserToProject = async (projectId, role) => {
    return axios.post(`${API_BASE_URL}/project/${projectId}/add-user`, { role }, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error("❌ Error adding user to project:", error);
            throw error;
        });
};

export const createContent = async (projectId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/project/create-content/${projectId}`,
            {},
            { withCredentials: true } // 👈 config Axios ให้ใส่ Cookie
        );
        console.log("✅ Content created:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating content:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteContent = async (projectId, contentId) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/project/delete-content/${projectId}/${contentId}`,
            { withCredentials: true } 
        );
        console.log("✅ Content deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error deleting content:', error.response?.data || error.message);
        throw error;
    }
}

export const updateProjectById = async (projectId, updatedData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/project/update/${projectId}`,
            updatedData,
            { withCredentials: true }
        );
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
        const response = await axios.post(`${API_BASE_URL}/project/upload-file/${projectId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        )
        return response.data;
    } catch (error) {
        console.error("❌ Error uploading file:", error);
        throw error;
    }
};

export const deleteFileFromProject = async (projectId, fileId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/project/delete-file/${projectId}/${fileId}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting file:", error);
        throw error;
    }
}

export const createRoleToProject = async (projectId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/project/create-role/${projectId}`,
            {
                name: "None",
                color: "#D6D6D6"
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.error("❌ Error created role:", error);
        throw error;
    }
}

export const updateRole = async (projectId, roleId, name, color) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/project/update-role/${projectId}/${roleId}`,
            {
                name,
                color
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.error("❌ Error updated role:", error);
        throw error;
    }
}

export const deleteRole = async (projectId, roleId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/project/delete-role/${projectId}/${roleId}`, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("❌ Error deleted role:", error);
        throw error;
    }
}
