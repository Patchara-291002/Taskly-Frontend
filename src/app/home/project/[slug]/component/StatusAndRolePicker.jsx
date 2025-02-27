import { useEffect, useState, useCallback } from 'react'
import { createStatus, updateStatus } from '@/api/status';
import { createRoleToProject, updateRole } from '@/api/project';

export default function StatusAndRolePicker({ project }) {

  const [statusPayload, setStatusPayload] = useState([]);
  const [rolePayload, setRolePayload] = useState([]);

  useEffect(() => {
    if (project?.statuses) {
      setStatusPayload(project.statuses);
    }
    if (project?.roles)
      setRolePayload(project.roles);
  }, [project])

  // handle change data
  function handleStatusChange(id, key, value) {
    setStatusPayload((prev) =>
      prev.map(status =>
        status._id === id ? { ...status, [key]: value } : status
      )
    )
  }

  function handleRoleChange(id, key, value) {
    setRolePayload((prev) => 
      prev.map(role => 
        role.roleId === id ? { ...role, [key]: value } : role
      )
    )
  }

  // ✅ ใช้ useCallback เพื่ออัปเดต API อัตโนมัติ
  const updateStatusData = useCallback(async (statusPayload) => {
    try {
      await updateStatus(
        statusPayload._id,
        statusPayload.statusName,
        statusPayload.color,
        statusPayload.isDone
      );
      // console.log(`✅ Updated assignment: ${project.statuses}`);
    } catch (error) {
      console.error("❌ Failed to update status:", error);
    }
  }, []);
  
  const updateRoleData = useCallback(async (rolePayload) => {
    try {
      await updateRole(
        project._id,
        rolePayload.roleId,
        rolePayload.name,
        rolePayload.color
      );
      // console.log(`✅ Updated assignment: ${project.statuses}`);
    } catch (error) {
      console.error("❌ Failed to update role:", error);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      statusPayload.forEach(status => {
        if (status._id) { 
          updateStatusData(status);
        }
      });
    }, 1000);
  
    return () => clearTimeout(delay);
  }, [statusPayload, updateStatusData]);

  useEffect(() => {
    const delay = setTimeout(() => {
      rolePayload.forEach(role => {
        if (role.roleId) { 
         updateRoleData(role);
        }
      });
    }, 1000);
  
    return () => clearTimeout(delay);
  }, [rolePayload, updateRoleData]);

  return (
    <div
      className='w-full flex gap-[15px] my-[30px] z-50'
    >
      <StatusPicker project={project} statusPayload={statusPayload} handleStatusChange={handleStatusChange} />
      <RolePicker project={project} rolePayload={rolePayload} handleRoleChange={handleRoleChange} />
    </div>
  )
}

const StatusPicker = ({ project, statusPayload, handleStatusChange }) => {

  const [openStatus, setOpenStatus] = useState(false)

  const NewStatus = async () => {

    const status = {
      projectId: project._id,
      statusName: "New status",
      color: "#D6D6D6"
    }

    try {
      await createStatus(status.projectId, status.statusName, status.color);
      window.location.reload()
      console.log(statusPayload);
    } catch (error) {
      console.error("❌ Failed to create status:", error);
    }
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setOpenStatus(!openStatus)}
        className='px-[14px] py-[4px] border-2 rounded-full'
      >
        Status
      </button>
      {openStatus && (
        <div
          className='absolute p-[15px] w-[200px] min-h-[148px] bg-white rounded-md shadow-md'
        >
          <div
            className='flex justify-between items-center'
          >
            <p>Status</p>
            <button
              onClick={NewStatus}
            >
              add
            </button>
          </div>
          <ul>
            {statusPayload && statusPayload.map((s) => {
              return (
                <li
                  key={s._id}
                  className="py-2 flex items-center gap-[5px]"
                // onClick={() => {
                //   onChange(s.name);
                //   setOpenStatus(false);
                // }}
                >
                  <div className="relative w-3 h-3">
                    <input
                      type="color"
                      value={s.color}
                      onChange={(e) => handleStatusChange(s._id, "color", e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span
                      className="absolute w-3 h-3 rounded-full border pointer-events-none"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                  <input
                    type="text"
                    value={s.statusName}
                    onChange={(e) => handleStatusChange(s._id, "statusName", e.target.value)}
                    className='bg-white w-[140px] focus:outline-none'
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
const RolePicker = ({ project, rolePayload, handleRoleChange }) => {

  const [openRole, setOpenRole] = useState(false)

  const NewRole = async () => {
    try {
      await createRoleToProject(project._id,);
      window.location.reload()
      console.log(rolePayload);
    } catch (error) {
      console.error("❌ Failed to create status:", error);
    }
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setOpenRole(!openRole)}
        className='px-[14px] py-[4px] border-2 rounded-full'
      >
        Role
      </button>
      {openRole && (
        <div
          className='absolute p-[15px] w-[200px] min-h-[148px] bg-white rounded-md shadow-md'
        >
          <div
            className='flex justify-between items-center'
          >
            <p>Role</p>
            <button
              onClick={NewRole}
            >
              add
            </button>
          </div>
          <ul>
            {rolePayload && rolePayload.map((r) => {
              return (
                <li
                  key={r.roleId}
                  className="py-2 flex items-center gap-[5px]"
                // onClick={() => {
                //   onChange(s.name);
                //   setOpenStatus(false);
                // }}
                >
                  <div className="relative w-3 h-3">
                    <input
                      type="color"
                      value={r.color}
                      onChange={(e) => handleRoleChange(r.roleId, "color", e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span
                      className="absolute w-3 h-3 rounded-full border pointer-events-none"
                      style={{ backgroundColor: r.color }}
                    />
                  </div>
                  <input
                    type="text"
                    value={r.name}
                    onChange={(e) => handleRoleChange(r.roleId, "name", e.target.value)}
                    className='bg-white w-[140px] focus:outline-none'
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
