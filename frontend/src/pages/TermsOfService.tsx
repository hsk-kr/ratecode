import BackButton from '../components/BackButton';
import Box from '../components/Box';
import Text from '../components/Text';

const clauses = [
  {
    title: 'Acceptance of Terms',
    desc: 'By accessing and using RateCode, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
  },
  {
    title: 'Description of Service',
    desc: "RateCode is a platform that allows developers to share code snippets and receive feedback through ratings. Our service enables users to: Share code snippets publicly, Rate other users' code using emoji-based ratings, View and learn from community-shared code examples.",
  },
  {
    title: 'User Responsibilities',
    desc: 'When using RateCode, you agree to: Share only code that you have the right to share publicly, Not upload malicious, harmful, or inappropriate content, Respect intellectual property rights, Provide constructive and respectful feedback to other users, Not attempt to reverse engineer or compromise the platform.',
  },
  {
    title: 'Content and Intellectual Property',
    desc: 'By sharing code on RateCode, you grant us a non-exclusive, worldwide, royalty-free license to display, distribute, and use your content for the purpose of operating the service. You retain all ownership rights to your code. You are solely responsible for the content you share and must ensure you have all necessary rights to share it publicly.',
  },
  {
    title: 'Account Terms',
    desc: 'Authentication is handled through Google OAuth. You are responsible for maintaining the security of your Google account. We are not liable for any loss or damage from your failure to maintain account security.',
  },
  {
    title: 'Prohibited Uses',
    desc: 'You may not use RateCode to: Share malicious code, viruses, or harmful software, Violate any applicable laws or regulations, Infringe on intellectual property rights, Harass, abuse, or harm other users, Spam or flood the platform with unwanted content.',
  },
  {
    title: 'Limitation of Liability',
    desc: "RateCode is provided 'as is' without any guarantees. We are not liable for any damages arising from your use of the service, including but not limited to data loss, security breaches, or any issues with shared code.",
  },
  {
    title: 'Termination',
    desc: 'We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason, including breach of these Terms of Service.',
  },
  {
    title: 'Changes to Terms',
    desc: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of RateCode after changes constitutes acceptance of the new Terms.',
  },
  {
    title: 'Contact Information',
    desc: 'If you have questions about these Terms of Service, please contact us through our platform or create an issue on our repository.',
  },
];

const TermsOfService = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <BackButton />
      </div>
      <Box color="darkGray">
        <div className="flex flex-col gap-2 items-center mb-4">
          <Text color="cyan" size="3xl">
            Terms of Service
          </Text>
          <Text color="gray" size="md">
            Last Updated: 2025-10-21
          </Text>
        </div>
        <main className="flex flex-col gap-6">
          {clauses.map((clause, clauseIdx) => (
            <Clause
              key={clauseIdx}
              title={`${clauseIdx + 1}. ${clause.title}`}
              desc={clause.desc}
            />
          ))}
        </main>
      </Box>
    </div>
  );
};

const Clause = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <section className="flex flex-col">
      <Text
        color="white"
        className="border-b border-b-gray-700 pb-2 mb-2"
        size="xl"
      >
        {title}
      </Text>
      <Text color="textDefault" size="md">
        {desc}
      </Text>
    </section>
  );
};

export default TermsOfService;
