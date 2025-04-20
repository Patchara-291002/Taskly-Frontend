import React from 'react'
import { AddUserIcon } from '../component/icon/GlobalIcon'

export default function Page() {
  return (
    <div
      className='w-full '
    >
      <div
        className='max-w-[1200px] mx-auto bg-white flex flex-col lg:flex-row items-center py-[25px] px-[60px] border border-grayBorder rounded-[15px] gap-[25px] drop-shadow-md'
      >
        <HelpHeader />
        <HelpContent />
      </div>
    </div>
  )
}

const HelpHeader = () => {
  return (
    <div
      className='w-full flex flex-col gap-[10px]'
    >
      <p
        className='text-[48px] flex-nowrap font-bold text-primaryOrange'
      >
        Frequently Asked Questions?
      </p>
      <p
        className='text-[16px] font-normal text-[#1F1E1D]'
      >
        ยินดีต้อนรับสู่ศูนย์ช่วยเหลือของ Taskly ที่นี่คุณจะพบคำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับการใช้งานแพลตฟอร์มของเรา 
      </p>
    </div>
  )
}

const HelpContent = () => {

  const data = [
    {
      category: "เกี่ยวกับ Taskly",
      question: "Taskly คืออะไร?",
      answer: <p>
        Web application ที่ช่วยให้นักศึกษาสามารถจัดการและวางแผนงานได้อย่างมีประสิทธิภาพ ไม่ว่าจะเป็นงานกลุ่มหรือการบ้านในรายวิชาที่ทำคนเดียว โดย Taskly สามารถทำให้ผู้ใช้ จัดการบริหารงานได้มีประสิทธิภาพมากขึ้น โดยผู้ใช้สามารถติดตามความคืบหน้างาน มองเห็นภาพรวมของงานทั้งหมด และได้รับการแจ้งเตือนผ่านทาง LINE เพื่อไม่พลาดทุกกำหนดส่งงาน
      </p>
    },
    {
      category: "เกี่ยวกับ Taskly",
      question: "Project มีไว้ทำอะไร?",
      answer: <p>
        ฟีเจอร์ของระบบช่วยให้การทำงานร่วมกับทีมเป็นระบบมากยิ่งขึ้น มีการแบ่งงาน ด้วยการแบ่งงาน มอบหมายหน้าที่ และกำหนดความรับผิดชอบของแต่ละคนอย่างชัดเจน และสามารถติดตามภาพรวมของโปรเจกต์ได้ผ่านเครื่องมืออย่าง Kanban Board และ Gantt Chart ซึ่งช่วยให้เห็นความคืบหน้าและลำดับขั้นของงานได้อย่างเป็นระเบียบ
      </p>
    },
    {
      category: "เกี่ยวกับ Taskly",
      question: " Study Planner มีไว้ทำอะไร?",
      answer: <p>
        เป็นฟีเจอร์สำหรับการบันทึกงานส่วนตัวหรือการบ้าน ช่วยให้ผู้ใช้สามารถติดตามความคืบหน้างานของตนเองได้อย่างมีระบบ และสามารถดูตารางกำหนดการประจำสัปดาห์ เพื่อช่วยให้ผู้ใช้มองเห็นภาพรวมของตารางชีวิตและจัดสรรเวลาได้อย่างมีประสิทธิภาพ
      </p>
    },
    {
      category: "หมวดการใช้งานทั่วไป",
      question: "เพิ่มผู้ใช้เข้ามาใน Project ของเรายังไง?",
      answer:
        <p className='flex items-center flex-wrap gap-1'>
          คลิกที่ไอคอน
          <span className="inline-flex mx-1">
            <AddUserIcon w='20' h='20' color='#FF6200' />
          </span>
          ด้านขวาบน แล้วเลือก "Invite" จากนั้นส่งลิงก์ให้ผู้ใช้อีกคนที่มีบัญชี Taskly อยู่แล้ว ระบบจะเพิ่มเพื่อนเข้ามาในทีมโดยอัตโนมัติ
        </p>
    },
    {
      category: "หมวดการใช้งานทั่วไป",
      question: "จะกำหนด Role ให้กับผู้ใช้ยังไง?",
      answer: <p className='flex items-center flex-wrap gap-1'>
        เมื่อเข้าไปยังโปรเจกต์ของคุณ ให้คลิกที่ไอคอน
        <span className="inline-flex mx-1">
          <AddUserIcon w='20' h='20' color='#FF6200' />
        </span>
        ด้านขวาบน จากนั้นคุณจะเห็นรายชื่อสมาชิกในทีมทั้งหมด ให้กดที่เมนู Role ด้านขวาของรายชื่อ แล้วเลือกบทบาท (Role) ที่คุณได้สร้างไว้ล่วงหน้า
      </p>
    },
    {
      category: "หมวดการใช้งานทั่วไป",
      question: " จะเพิ่มข้อมูลในตารางเรียนยังไง?",
      answer: <p>
        เมื่อเข้าหน้า Study planner กดปุ่ม + เพื่อสร้าง Course ของคุณ จากนั้นระบบจะพาไปยังหน้ารายละเอียดของ Course ที่คุณสร้างไว้ ให้กำหนดเวลาเรียนทางด้านซ้ายบน โดยเลือกวันที่ เวลาเริ่มต้น และเวลาสิ้นสุด เพียงเท่านี้ข้อมูลจะถูกบันทึกลงในตารางเรียนของคุณเรียบร้อย
      </p>
    },
    {
      category: "หมวดการใช้งานทั่วไป",
      question: "ระบบแจ้งเตือนทำงานอย่างไร?",
      answer: <p>
        ระบบจะทำการแจ้งเตือนผ่าน LINE Official Account ของ Taskly โดยอัตโนมัติ เมื่อผู้ใช้ล็อกอินเข้าสู่ระบบและเพิ่มเพื่อนกับบัญชี LINE Taskly
      </p>
    },
    {
      category: "หมวดการใช้งานทั่วไป",
      question: "จะแจ้งเตือนตอนไหน?",
      answer: <p>
        เมื่อมีสมาชิกคนอื่นมอบหมายงานให้ ระบบจะแจ้งเตือนทันทีภายในแอป แต่สำหรับการแจ้งเตือนกำหนดส่งงาน ระบบจะแจ้งเตือนตั้งแต่เวลา 07:00 น. เป็นต้นไป
      </p>
    },
  ]

  return (
    <div
      className='w-full'
    >
      {data.map((item, index) => (
        <div
          className=" w-full collapse collapse-arrow rounded-[5px] bg-white border boder-grayBorder"
          key={index}
        >
          <input
            type="radio"
            name="my-accordion-2"
            defaultChecked={index === 0}
          />
          <div
            className="collapse-title font-medium text-[16px]"
          >
            {item.question}
          </div>
          <div
            className="collapse-content font-normal text-[14px] text-[#5F5F5F]"
          >
            {item.answer}
          </div>
        </div>
      ))}

    </div>
  )
}