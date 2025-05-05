import ButtonPrimary from "./reuseable/ButtonPrimary";
import Topic from "./reuseable/Topic";
import Detail from "./reuseable/Detail";

function About() {
  return (
    <section className="text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-center items-center gap-x-64 container mx-auto">
      <div className="relative flex-shrink-0">
        <img
          src="/homepage/about.png"
          alt="Security Illustration"
          className="w-full max-w-md relative transform scale-110 -translate-y-10 z-10 h-24"
        />
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-40 -left-60"></div>
      </div>
      <div className="max-w-lg mb-8 lg:mb-24">
        <Topic>About Begin Sec</Topic>
        <Detail className="font-ibmthai">
          Begin Sec ก่อตั้งขึ้นจากแนวคิดที่ว่า
          “ทุกคนควรมีโอกาสเข้าถึงความรู้ด้านความปลอดภัยทางไซเบอร์”
          ไม่ว่าคุณจะเป็นมือใหม่ที่เพิ่งเริ่มต้น
          หรือผู้เชี่ยวชาญที่ต้องการอัปเดตเทคนิคใหม่ ๆ เราเชื่อว่า ‘ความรู้’
          คือเครื่องมือที่ดีที่สุดในการรับมือกับภัยคุกคามที่เปลี่ยนแปลงอยู่ตลอดเวลา
          เราจึงออกแบบแพลตฟอร์มนี้ให้เป็นพื้นที่เรียนรู้ที่เป็นมิตร เข้าถึงง่าย
          และสนุก ผ่านบทเรียน แบบ CTF (Capture the Flag)
          และห้องแล็บจำลองสถานการณ์จริง เพื่อให้คุณได้ฝึกคิด วิเคราะห์
          และแก้ไขปัญหาอย่างมีระบบ
          เป้าหมายของเราคือการปลูกฝังทักษะความปลอดภัยตั้งแต่พื้นฐาน
          จนคุณสามารถนำไปใช้ได้จริง ทั้งในชีวิตประจำวันและในสายอาชีพด้านไซเบอร์
        </Detail>
        <ButtonPrimary>Read More</ButtonPrimary>
      </div>
    </section>
  );
}

export default About;
