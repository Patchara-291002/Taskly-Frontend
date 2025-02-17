import { extractFormattedDate } from '@/utils/dateUtils'
import { PlusIcon } from '../../component/icon/GlobalIcon'

export default function Table({ assignmentData }) {

  const heading = [
    {
      title: "name of assignment",
    },
    {
      title: "course",
    },
    {
      title: "description",
    },
    {
      title: "status",
    },
    {
      title: "due date",
    },
  ]

  const emptyTable = () => {
    return (
      <tr
        className='h-[40px]'
      >
        <td
          className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0'
        >
        </td>
        <td
          className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder'
        >

        </td>
        <td
          className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder'
        >

        </td>
        <td
          className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder'
        >

        </td>
        <td
          className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0'
        >

        </td>
      </tr>
    )
  }


  return (
    <div
      className="w-full"
    >
      <p
        className="font-medium text-[16px] pb-[15px]"
      >
        Assignments
      </p>
      <div
        className="w-full border-[1px] border-grayBorder bg-white p-[10px] rounded-[15px]"
      >
        <table
          className="table-fixed w-full border-collapse"
        >
          <colgroup>
            <col className="w-auto" />
            <col className="w-[200px]" />
            <col className="w-auto" />
            <col className="w-[160px]" />
            <col className="w-auto" />
          </colgroup>
          <thead>
            <tr>
              <th
                className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder"
              >
                name of assignment
              </th>
              <th
                className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder"
              >
                course
              </th>
              <th
                className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder"
              >
                description
              </th>
              <th
                className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder"
              >
                status
              </th>
              <th
                className="text-[14px] font-normal text-left py-[12px] px-[10px] border-grayBorder"
              >
                due date
              </th>
            </tr>
          </thead>
          <tbody>
            {assignmentData.length === 0 ? (
               emptyTable() 
            ) : (
              assignmentData.map((assignment, index) => (
                <tr key={index}>
                  <td
                    className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0'
                  >
                    {assignment.assignmentName}
                  </td>
                  <td
                    className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder'
                  >
                    {assignment.courseId.courseName}
                  </td>
                  <td
                    className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder'
                  >
                    {assignment.description}
                  </td>
                  <td
                    className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder'
                  >
                    {assignment.status}
                  </td>
                  <td
                    className='font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0'
                  >
                    {extractFormattedDate(assignment.endDate)}
                  </td>
                </tr>
              ))
            )
            }

            <tr
              className=''
            >
              <div
                className='flex items-center gap-[5px] py-[12px] px-[10px]'
              >
                <PlusIcon w={12} h={12} color={"#FF6200"} />
                <p
                  className='font-normal text-[12px] text-[#5F5F5F]'
                >
                  new assignment
                </p>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
