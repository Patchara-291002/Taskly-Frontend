import { useEffect, useState } from 'react'
import { createStatus, updateStatus, deleteStatus } from '@/api/status';
import { createRoleToProject, updateRole, deleteRole } from '@/api/project';
import { DropDownIcon } from '@/app/component/GlobalIcon';
import { PlusIcon2, TrashSolidIcon } from '@/app/home/component/icon/GlobalIcon';

const PickerItem = ({ item, type, onChange, onColorChange, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemId = type === 'status' ? item._id : item.roleId;
  const itemName = type === 'status' ? item.statusName : item.name;

  return (
    <div className='flex justify-between items-center'>
      <li className="py-2 flex items-center gap-[5px]">
        <div className="relative w-3 h-3">
          <input
            type="color"
            value={item.color || "#D6D6D6"}
            onChange={(e) => onColorChange(itemId, "color", e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <span
            className="absolute w-3 h-3 rounded-[2px] pointer-events-none"
            style={{ backgroundColor: item.color || "#D6D6D6" }}
          />
        </div>
        <input
          type="text"
          value={itemName}
          onChange={(e) => onChange(itemId, e.target.value)}
          className='bg-white w-[140px] focus:outline-none text-[12px]'
          placeholder={`Enter ${type} name`}
        />
      </li>
      <button
        className='p-2 rounded-full transition-colors hover:bg-red-100'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onDelete(itemId)}
      >
        <TrashSolidIcon w={12} h={12} color={isHovered ? "#FF0000" : "#CBCBCB"} />
      </button>
    </div>
  );
};

const Picker = ({ title, type, items, isOpen, onToggle, onNew, onChange, onColorChange, onDelete }) => {
  return (
    <div className='relative'>
      <button
        onClick={onToggle}
        className='px-[14px] py-[4px] border border-primaryOrange rounded-full flex justify-center items-center gap-[5px]'
      >
        <p className='text-primaryOrange text-[14px] font-medium'>{title}</p>
        <DropDownIcon w={10} h={5} color={"#FF6200"} />
      </button>
      {isOpen && (
        <div className='absolute p-[15px] w-[200px] min-h-[148px] bg-white rounded-md shadow-md'>
          <div className='flex justify-between items-center mb-[15px]'>
            <p className='text-primaryOrange text-[12px] font-semibold'>{title}</p>
            <button
              onClick={onNew}
              className='w-[16px] h-[16px] flex justify-center items-center rounded-full border-[1.5px] border-primaryOrange hover:bg-orange-50'
            >
              <PlusIcon2 w={6} h={6} color={"#FF6200"} />
            </button>
          </div>
          <ul className='space-y-2'>
            {items?.map((item) => (
              <PickerItem
                key={type === 'status' ? item._id : item.roleId}
                item={item}
                type={type}
                onChange={onChange}
                onColorChange={onColorChange}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function StatusAndRolePicker({ project, loadProject }) {
  const [statusPayload, setStatusPayload] = useState([]);
  const [rolePayload, setRolePayload] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [openRole, setOpenRole] = useState(false);

  useEffect(() => {
    if (project?.statuses) setStatusPayload(project.statuses);
    if (project?.roles) setRolePayload(project.roles);
  }, [project]);

  // Status handlers
  const handleStatusChange = (id, value) => {
    setStatusPayload(prev =>
      prev.map(status =>
        status._id === id
          ? { ...status, statusName: value }
          : status
      )
    );
  };

  const handleStatusColorChange = (id, key, value) => {
    setStatusPayload(prev =>
      prev.map(status =>
        status._id === id
          ? { ...status, [key]: value }
          : status
      )
    );
  };

  const handleNewStatus = async () => {
    try {
      await createStatus(project._id, "New Status", "#D6D6D6");
      loadProject();
    } catch (error) {
      console.error("❌ Failed to create status:", error);
    }
  };

  const handleDeleteStatus = async (statusId) => {
    try {
      await deleteStatus(statusId);
      loadProject();
    } catch (error) {
      console.error("❌ Failed to delete status:", error);
    }
  };

  // Role handlers
  const handleRoleChange = (id, value) => {
    setRolePayload(prev =>
      prev.map(role =>
        role.roleId === id
          ? { ...role, name: value }
          : role
      )
    );
  };

  const handleRoleColorChange = (id, key, value) => {
    setRolePayload(prev =>
      prev.map(role =>
        role.roleId === id
          ? { ...role, [key]: value }
          : role
      )
    );
  };

  const handleNewRole = async () => {
    try {
      await createRoleToProject(project._id);
      loadProject();
    } catch (error) {
      console.error("❌ Failed to create role:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(project._id, roleId);
      loadProject();
    } catch (error) {
      console.error("❌ Failed to delete role:", error);
    }
  };

  // Auto-save with debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      statusPayload.forEach(async status => {
        if (status._id) {
          try {
            await updateStatus(
              status._id,
              status.statusName,
              status.color,
              status.isDone
            );
          } catch (error) {
            console.error("❌ Failed to update status:", error);
          }
        }
      });
    }, 1000);

    return () => clearTimeout(delay);
  }, [statusPayload]);

  useEffect(() => {
    const delay = setTimeout(() => {
      rolePayload.forEach(async role => {
        if (role.roleId) {
          try {
            await updateRole(
              project._id,
              role.roleId,
              role.name,
              role.color
            );
          } catch (error) {
            console.error("❌ Failed to update role:", error);
          }
        }
      });
    }, 1000);

    return () => clearTimeout(delay);
  }, [rolePayload, project._id]);

  return (
    <>
      <div className='w-full flex gap-[15px] my-[30px] z-50'>
        <Picker
          title="Status"
          type="status"
          items={statusPayload}
          isOpen={openStatus}
          onToggle={() => setOpenStatus(!openStatus)}
          onNew={handleNewStatus}
          onChange={handleStatusChange}
          onColorChange={handleStatusColorChange}
          onDelete={handleDeleteStatus}
        />
        <Picker
          title="Role"
          type="role"
          items={rolePayload}
          isOpen={openRole}
          onToggle={() => setOpenRole(!openRole)}
          onNew={handleNewRole}
          onChange={handleRoleChange}
          onColorChange={handleRoleColorChange}
          onDelete={handleDeleteRole}
        />
      </div>
      <div
        className='w-full flex flex-wrap gap-[15px] mb-[30px]'
      >
        {rolePayload?.map((role, index) => (
          <div
            key={index}
            className='flex gap-[7px] items-center'
          >
            <span
              className='w-[10px] h-[10px] rounded-full'
              style={{ backgroundColor: role.color || "#D6D6D6" }}
            />
            <p
              className='text-[12px] text-[#1F1E1D]'
            >
              {role.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}