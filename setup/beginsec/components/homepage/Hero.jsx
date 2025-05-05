import ButtonPrimary from "./reuseable/ButtonPrimary";
import ButtonSecondary from "./reuseable/ButtonSecondary";
import Topic from "./reuseable/Topic";
import Detail from "./reuseable/Detail";

function Hero() {
  return (
    <section className="text-white py-16 px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row justify-center items-center gap-x-64 container mx-auto">
      <div className="max-w-lg mb-8 lg:mb-24">
        <Topic>Strong Security Starts with Smart Users</Topic>
        <Detail className="font-ibmthai">
          ในยุคที่เทคโนโลยีเติบโตอย่างรวดเร็ว
          การป้องกันความปลอดภัยทางไซเบอร์ไม่ได้เป็นเพียงหน้าที่ของโปรแกรมเมอร์หรือผู้ดูแลระบบอีกต่อไป
          แต่เป็นความรับผิดชอบของ “ทุกคน” ที่ใช้งานอินเทอร์เน็ต
          ไม่ว่าคุณจะเป็นพนักงานทั่วไป นักเรียน หรือเจ้าของกิจการ
          การรู้เท่าทันภัยคุกคามไซเบอร์และเข้าใจพฤติกรรมดิจิทัลที่ปลอดภัยคือกุญแจสำคัญในการปกป้องตัวคุณเอง
        </Detail>
        <div className="flex space-x-4">
          <ButtonPrimary>Get Started</ButtonPrimary>
          <ButtonSecondary>Learn More</ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-shrink-0">
        <div className="absolute bg-gradient-to-br from-[#161831] via-[#391A81] to-[#8F6CE1] blur-3xl rounded-full w-96 h-96 -top-10 -right-10"></div>
        <img
          src="homepage/hero.png"
          alt="Security Illustration"
          className="relative w-full max-w-md transform scale-100 z-10"
        />
      </div>
    </section>
  );
}
export default Hero;
