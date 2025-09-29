import Badge from '../Badge';
import Box from '../Box';
import Button from '../Button';
import DateLabel from '../DateLabel';
import Ratings from '../Ratings';
import Text from '../Text';
import Views from '../Views';

import { IoCodeOutline } from 'react-icons/io5';

type CodeSnippet = {
  language: string;
  code: string;
};

type CodeSnippetsProps = {
  snippets?: CodeSnippet[];
};

const dummy: CodeSnippetsProps['snippets'] = [
  {
    language: 'javascript',
    code: `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci2(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Classic recursive approach - but is it efficient?
// Time complexity: O(2^n) - exponential growth!
/...
`,
  },
];

const CodeSnippets = ({ snippets = dummy }: CodeSnippetsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Text color="white" size="xl">
        My Code Snippets
      </Text>
      <div className="p-2">
        <EmptyCodeSnippet />
        {snippets.map((snippet, snippetIdx) => (
          <CodeSnippet key={snippetIdx} {...snippet} />
        ))}
      </div>
    </div>
  );
};

const EmptyCodeSnippet = () => {
  return (
    <Box color="darkGray" className="gap-4" center>
      <IoCodeOutline className="text-4xl text-gray-400" />
      <div className="flex flex-col items-center">
        <Text color="gray" size="md">
          You haven’t shared any snippets yet.
        </Text>
        <Text color="cyan" size="md">
          Write some code and get it rated!
        </Text>
      </div>
    </Box>
  );
};

const CodeSnippet = ({ language, code }: CodeSnippet) => {
  return (
    <Box color="darkGray" className="gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
        <div className="flex gap-2 flex-col sm:flex-row">
          <Badge color="cyan">{language}</Badge>
          <DateLabel date={new Date()} />
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Views views={12} />
          <Ratings ratingCnt={12} />
        </div>
      </div>
      <code className="bg-gray-800 border border-gray-600 rounded p-4 text-sm text-gray-300 overflow-x-auto whitespace-pre h-48 overflow-y-auto">
        {code.trim()}
      </code>
      <div className="flex gap-2">
        <Button color="cyan" varient="fill" icon="copy">
          Copy Link
        </Button>
        <Button color="red" varient="fill" icon="bin">
          Delete
        </Button>
      </div>
    </Box>
  );
};

export default CodeSnippets;
