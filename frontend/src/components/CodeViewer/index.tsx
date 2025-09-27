import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Text from '../Text';
import { twMerge } from 'tailwind-merge';
import {
  convertLanguageToCodeViewerLanguage,
  type SupportedLanguage,
} from '../../utils/code';

const CodeViewer = ({
  title,
  language: _language,
}: {
  title: string;
  language: SupportedLanguage;
}) => {
  const language = convertLanguageToCodeViewerLanguage(_language);

  return (
    <div className="rounded-xl bg-gray-900 border border-gray-700 overflow-hidden">
      <div className="flex items-center bg-gray-700 px-4 py-3 border-b border-gray-600 gap-4">
        <div className="flex gap-2">
          <WindowIconButton color="red" />
          <WindowIconButton color="yellow" />
          <WindowIconButton color="green" />
        </div>
        <Text color="textDefault" size="sm">
          {title}
        </Text>
      </div>
      <SyntaxHighlighter
        language={language}
        style={hybrid}
        customStyle={{ height: 400, fontSize: 13 }}
      >
        {`

<html>
  <head>
    <title>test</title>
  </head>
  <script>
    console.log('what the fuck');
  </script>
</html>
`}
      </SyntaxHighlighter>
    </div>
  );
};

const WindowIconButton = ({ color }: { color: 'red' | 'yellow' | 'green' }) => {
  const colorClassNames: Record<typeof color, string> = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  const className = twMerge('size-3 rounded-full', colorClassNames[color]);

  return <div className={className}></div>;
};

export default CodeViewer;
