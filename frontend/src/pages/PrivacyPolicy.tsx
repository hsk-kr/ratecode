import BackButton from '../components/BackButton';
import Box from '../components/Box';
import Text from '../components/Text';

const clauses = [
  {
    title: 'Information We Collect',
    desc: 'RateCode collects minimal information to provide our service. This includes: Google Account Information (your name, email address, and profile picture via Google OAuth), Code Snippets (the code you share on our platform), Ratings (emoji ratings you give to code snippets), and Usage Data (basic analytics stored locally in your browser).',
  },
  {
    title: 'How We Use Your Information',
    desc: 'We use the collected information to authenticate and identify you on the platform, display your shared code snippets to others, show your profile information alongside contributions, provide rating and feedback features, and improve the overall user experience.',
  },
  {
    title: 'Information Sharing',
    desc: "We do not sell, trade, or rent your personal information to third parties. Information is shared only in limited ways: code snippets you share are publicly visible, your name and profile picture appear with your contributions, and Google handles authentication via Google OAuth (subject to Google's privacy policy).",
  },
  {
    title: 'Data Storage and Security',
    desc: "Your data security is important to us. Code snippets are stored locally in your browser's localStorage. Authentication is handled through Google OAuth, and we do not store passwords or sensitive authentication data. All data transmission is encrypted using HTTPS.",
  },
  {
    title: 'Cookies and Local Storage',
    desc: 'RateCode uses browser localStorage to store your code snippets on your device, remember preferences and settings, and maintain session information. You may clear this data at any time through your browser settings, though this will remove locally stored code snippets.',
  },
  {
    title: 'Third-Party Services',
    desc: "RateCode integrates with third-party services including Google OAuth (for authentication, governed by Google's privacy policy) and Unsplash (for loading demo images, governed by Unsplash's privacy policy).",
  },
  {
    title: 'Your Rights and Choices',
    desc: 'You have the right to access the personal information we hold about you, request deletion of your account and associated data, opt out of data collection by not using the service, and clear locally stored data through your browser settings.',
  },
  {
    title: "Children's Privacy",
    desc: 'RateCode is not intended for children under 13. We do not knowingly collect information from children under 13, and if such data is discovered, we will remove it promptly.',
  },
  {
    title: 'International Users',
    desc: 'RateCode is operated from the United States. By using the service, you consent to the transfer of your information to the United States, which may have different data protection laws from your country.',
  },
  {
    title: 'Changes to This Privacy Policy',
    desc: "We may update this Privacy Policy from time to time. Updates will be posted on this page with an updated 'Last updated' date. Continued use of the service after updates means acceptance of the revised Privacy Policy.",
  },
  {
    title: 'Contact Us',
    desc: 'If you have any questions about this Privacy Policy or our data practices, please contact us through our platform or create an issue on our repository.',
  },
];

const PrivacyPolicy = () => {
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

export default PrivacyPolicy;
