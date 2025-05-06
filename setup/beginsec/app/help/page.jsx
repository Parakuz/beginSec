import React from "react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#161831] to-[#0f1022] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header with decorative element */}
        <div className="relative mb-12">
          <h1 className="text-5xl font-bold tracking-tight font-ibmthai">
            Help (หน้าช่วยเหลือ)
          </h1>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-300 leading-relaxed mb-10 font-ibmthai">
          ยินดีต้อนรับสู่ ศูนย์ช่วยเหลือของ BeginSec
          <br />
          หากคุณพบปัญหาการใช้งานเว็บไซต์ หรือไม่แน่ใจว่าจะเริ่มจากตรงไหน
          โปรดดูคำแนะนำด้านล่างนี้
        </p>

        {/* Help sections */}
        <div className="space-y-12">
          <HelpSection
            title="🔐 การสมัครสมาชิกและเข้าสู่ระบบ"
            items={[
              "หากคุณยังไม่มีบัญชี สามารถสมัครได้ที่ปุ่ม Sign up บนหน้าแรก",
              "หากลืมรหัสผ่าน สามารถกด Forgot Password เพื่อรับลิงก์รีเซ็ตรหัสผ่านใหม่",
            ]}
          />

          <HelpSection
            title="🧪 การใช้งาน Lab และ CTF"
            items={[
              "ไปที่เมนู Learning Path เพื่อเริ่มต้นใช้งาน",
              "แต่ละบทเรียนจะมีคำแนะนำ วิธีการเริ่มต้น lab และช่องใส่คำตอบ หรือ ช่องกรอก flag เมื่อพบช่องโหว่",
              'หาก container ไม่โหลด โปรดลองกดปุ่ม "Start Lab" อีกครั้ง หรือ refresh หน้า หรือติดต่อผู้ดูแลระบบ',
            ]}
          />

          <HelpSection
            title="📚 การเรียนรู้ตามเส้นทาง"
            items={[
              "ระบบจะมี Learning Path ที่แนะนำตามบทเรียนที่เราสนใจ",
              "คุณสามารถดูสถานะความคืบหน้าของตนเองได้ในหน้า Dashboard",
            ]}
          />

          <HelpSection
            title="💬 ต้องการความช่วยเหลือเพิ่มเติม?"
            items={[
              "หากยังพบปัญหา กรุณาติดต่อทีมงานได้ที่:",
              <span key="email">อีเมล: <a href="mailto:beginsec35@gmail.com" className="text-white hover:text-gray-300 underline">beginsec35@gmail.com</a></span>,
              "หรือสอบถามใน Discord Server หรือ Community Facebook",
              'หรือใช้แบบฟอร์ม "Contact" ในหน้า Labs',
            ]}
          />
        </div>

        {/* FAQ section (optional) */}
        <div id="faq" className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-semibold mb-6 font-ibmthai">
            ❓ FAQ (คำถามที่พบบ่อย)
          </h2>
          <div className="space-y-6">
            <FaqItem
              question="จำเป็นต้องมีพื้นฐานด้าน Cybersecurity หรือไม่?"
              answer="ไม่จำเป็น เว็บไซต์นี้ออกแบบมาสำหรับผู้เริ่มต้นโดยเฉพาะ โดยมีเส้นทางการเรียนรู้ที่เป็นขั้นเป็นตอน"
            />
            <FaqItem
              question="ฉันต้องติดตั้งอะไรเพิ่มไหมในการเล่น Labs?"
              answer="ไม่ต้องติดตั้งอะไรเพิ่มเติม ระบบของเรารัน container labs ในเบราว์เซอร์ให้พร้อมใช้งานทันที"
            />
            <FaqItem
              question="จะรู้ได้อย่างไรว่าคำตอบที่ใส่ถูกต้อง?"
              answer="เมื่อคุณใส่คำตอบที่ถูกต้องในช่องคำตอบ ระบบจะแสดงข้อความ ✅ All answers are correct! และปลดล็อกคะแนนระดับถัดไป"
            />
            <FaqItem
              question="Flag มีรูปแบบอย่างไร?"
              answer="โดยทั่วไม่ถูญ flag จะอยู่ในรูปแบบ FLAG{...} เช่น FLAG{xss_found} กรุณาใส่ให้ครบรูปแบบ"
            />
            <FaqItem
              question="ฉันสามารถเรียนฟรีหรือไม่?"
              answer="ได้ครับ ระบบหลักทั้งหมดรวมถึง Lab พื้นฐานและ CTF Challenge เปิดให้ใช้งานฟรีสำหรับผู้ลงทะเบียน"
            />
            <FaqItem
              question="ทำไม container ไม่โหลด หรือโหลดช้า?"
              answer="อาจเกิดจากการใช้งานพร้อมกันจำนวนมาก หรือ VM มีปัญหาชั่วคราว โปรดลอง refresh หรือแจ้งผ่านระบบ support"
            />
          </div>
        </div>


      </div>
    </div>
  );
}

// Helper components for consistent styling
function HelpSection({ icon, title, items }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center font-ibmthai">
        <span className="mr-3">{icon}</span>
        {title}
      </h2>
      <div className="ml-6">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#ffffff] mr-2">•</span>
              <span className="text-white font-ibmthai">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  return (
    <div className="bg-[#1a1c3d]/70 p-5 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-medium mb-2 text-white font-ibmthai">
        {question}
      </h3>
      <p className="text-gray-300 font-ibmthai">{answer}</p>
    </div>
  );
}
