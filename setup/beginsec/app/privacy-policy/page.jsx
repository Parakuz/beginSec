export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#161831] to-[#0f1022] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header with decorative element */}
        <div className="relative mb-12">

          <h1 className="text-5xl font-bold tracking-tight">
            Privacy & Policy
          </h1>
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-300 leading-relaxed mb-10 font-ibmthai">
          ความเป็นส่วนตัวของคุณมีความสำคัญสำหรับเรา นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่ Begin Sec 
          เก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณเมื่อคุณใช้เว็บไซต์และบริการของเรา
        </p>

        {/* Policy sections */}
        <div className="space-y-12">
          <Section title="Information We Collect">
            <ul className="space-y-2">
              <ListItem>
                ข้อมูลระบุตัวตนส่วนบุคคล (ชื่อ, อีเมล, ฯลฯ)
              </ListItem>
              <ListItem>ข้อมูลการใช้งานและคุกกี้</ListItem>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="space-y-2">
              <ListItem>เพื่อให้บริการและรักษาบริการของเรา</ListItem>
              <ListItem>เพื่อแจ้งให้คุณทราบเกี่ยวกับการเปลี่ยนแปลงบริการของเรา</ListItem>
              <ListItem>เพื่อให้การสนับสนุนลูกค้า</ListItem>
              <ListItem>เพื่อติดตามการใช้งานบริการ</ListItem>
            </ul>
          </Section>

          <Section title="Cookies">
            <p className="text-gray-300 leading-relaxed font-ibmthai">
              เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณบนเว็บไซต์ของเรา คุณสามารถเลือกที่จะปิดการใช้งานคุกกี้
              ผ่านการตั้งค่าเบราว์เซอร์ของคุณได้
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p className="text-gray-300 leading-relaxed font-ibmthai">
              เราอาจว่าจ้างบริษัทบุคคลที่สามเพื่ออำนวยความสะดวกในการให้บริการของเรา
              บุคคลที่สามเหล่านี้สามารถเข้าถึงข้อมูลส่วนบุคคลของคุณเพื่อปฏิบัติงานในนามของเราเท่านั้น
              และมีหน้าที่ไม่เปิดเผยหรือใช้ข้อมูลเพื่อวัตถุประสงค์อื่นใด
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p className="text-gray-300 leading-relaxed font-ibmthai">
              เราอาจปรับปรุงนโยบายความเป็นส่วนตัวของเราเป็นครั้งคราว เราจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงใดๆ
              โดยการโพสต์นโยบายความเป็นส่วนตัวฉบับใหม่บนหน้านี้
            </p>
          </Section>

          <Section title="Contact Us">
            <p className="text-gray-300 leading-relaxed font-ibmthai">
              หากคุณมีคำถามใดๆ เกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเราที่{" "}
              <a
                href="mailto:beginsec35@gmail.com"
                className="text-white hover:text-gray-300 underline transition-colors"
              >
                beginsec35@gmail.com
              </a>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

// Helper components for consistent styling
function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <span className="inline-block h-3 w-3 bg-[#8F6CE1] rounded-full mr-3"></span>
        {title}
      </h2>
      <div className="ml-6">{children}</div>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex items-start">
      <span className="text-[#8F6CE1] mr-2">•</span>
      <span className="text-gray-300 font-ibmthai">{children}</span>
    </li>
  );
}