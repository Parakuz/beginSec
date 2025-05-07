import Topic from "./reuseable/Topic";
import Detail from "./reuseable/Detail";
import ButtonPrimary from "./reuseable/ButtonPrimary";
import HightlightCard from "./reuseable/Hightlight-card";

function HightLight() {
  return (
    <section className="text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-center items-center gap-x-64 container mx-auto">
      <div className="mb-12 lg:mb-0 flex-1 text-center lg:text-left">
        <Topic>Highlights</Topic>
        <Detail className="font-ibmthai">
          ไม่ว่าคุณจะเป็นนักเรียน นักศึกษา
          หรือคนทำงานที่อยากเริ่มต้นเส้นทางไซเบอร์ Begin Sec
          พร้อมเป็นพื้นที่ปลอดภัยให้คุณเรียนรู้ เติบโต
          และสนุกไปกับโลกของความปลอดภัยทางดิจิทัล
        </Detail>
        <div className="flex justify-center lg:justify-start space-x-4">
          <ButtonPrimary href={"/help"}>Learn More</ButtonPrimary>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 flex-1">
        <HightlightCard topic="Thai language" emotion="กขค" style />
        <HightlightCard
          topic="Free to learn"
          emotion="/homepage/free-to-learn.png"
        />
        <HightlightCard
          topic="User friendly"
          emotion="/homepage/user-friendly.png"
          style
        />
        <HightlightCard
          topic="Basic of cyber"
          emotion="/homepage/basic-of-cyber.png"
        />
      </div>
    </section>
  );
}

export default HightLight;
