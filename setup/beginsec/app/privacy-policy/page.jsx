export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#161831] to-[#0f1022] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header with decorative element */}
        <div className="relative mb-12">
          <div className="absolute -left-4 top-0 h-16 w-1 bg-blue-500 rounded-full" />
          <h1 className="text-5xl font-bold tracking-tight">
            Privacy & Policy
          </h1>
          <div className="h-1 w-20 bg-blue-500 mt-4 rounded-full" />
        </div>

        {/* Introduction */}
        <p className="text-lg text-gray-300 leading-relaxed mb-10">
          Your privacy is important to us. This Privacy Policy explains how
          Begin Sec collects, uses, and protects your personal information when
          you use our website and services.
        </p>

        {/* Policy sections */}
        <div className="space-y-12">
          <Section title="Information We Collect">
            <ul className="space-y-2">
              <ListItem>
                Personal identification information (Name, email address, etc.)
              </ListItem>
              <ListItem>Usage data and cookies</ListItem>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="space-y-2">
              <ListItem>To provide and maintain our service</ListItem>
              <ListItem>To notify you about changes to our service</ListItem>
              <ListItem>To provide customer support</ListItem>
              <ListItem>To monitor usage of the service</ListItem>
            </ul>
          </Section>

          <Section title="Cookies">
            <p className="text-gray-300 leading-relaxed">
              We use cookies to improve your experience on our site. You can
              choose to disable cookies through your browser settings.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p className="text-gray-300 leading-relaxed">
              We may employ third-party companies to facilitate our service.
              These third parties have access to your personal information only
              to perform tasks on our behalf and are obligated not to disclose
              or use it for any other purpose.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p className="text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
          </Section>

          <Section title="Contact Us">
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:support@beginsec.com"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                support@beginsec.com
              </a>
              .
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
      <span className="text-gray-300">{children}</span>
    </li>
  );
}
