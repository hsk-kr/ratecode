import Badge from '../Badge';
import Box from '../Box';
import Button from '../Button';
import DateLabel from '../DateLabel';
import Ratings from '../Ratings';
import Text from '../Text';
import Views from '../Views';

import { IoCodeOutline } from 'react-icons/io5';
import { FaRegBookmark } from 'react-icons/fa';
import type { ComponentProps } from 'react';
import { useConfirmModal } from '../modals/ConfirmModal';

type CodeSnippet = {
  language: string;
  code: string;
  saved?: boolean;
};

type CodeSnippetsProps = {
  type: 'save' | 'mycode';
  snippets?: CodeSnippet[];
};

const dummy: CodeSnippetsProps['snippets'] = [
  {
    saved: true,
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
  {
    saved: false,
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

const CodeSnippets = ({ type, snippets = dummy }: CodeSnippetsProps) => {
  const deletable = type === 'mycode';
  const savable = type === 'save';

  return (
    <div className="flex flex-col gap-2">
      <Text color="white" size="xl">
        My Code Snippets
      </Text>
      <div className="p-2 flex flex-col gap-4">
        <EmptyCodeSnippet type={type} />
        {snippets.map((snippet, snippetIdx) => (
          <CodeSnippet
            key={snippetIdx}
            {...snippet}
            savable={savable}
            deletable={deletable}
          />
        ))}
      </div>
    </div>
  );
};

const EmptyCodeSnippet = ({ type }: Pick<CodeSnippetsProps, 'type'>) => {
  const messages: Record<
    typeof type,
    [string, string, ComponentProps<typeof Text>['color']]
  > = {
    mycode: [
      `You haven’t shared any snippets yet.`,
      'Write some code and get it rated!',
      'cyan',
    ],
    save: [
      `You haven't bookmarked any snippets yet.`,
      'Explore and bookmark interesting code!',
      'purple',
    ],
  };

  return (
    <Box color="darkGray" className="gap-4" center>
      {type === 'mycode' && (
        <IoCodeOutline className="text-4xl text-gray-400" />
      )}
      {type === 'save' && <FaRegBookmark className="text-4xl text-gray-400" />}
      <div className="flex flex-col items-center">
        <Text color="gray" size="md">
          {messages[type][0]}
        </Text>
        <Text color={messages[type][2]} size="md">
          {messages[type][1]}
        </Text>
      </div>
    </Box>
  );
};

const CodeSnippet = ({
  language,
  code,
  deletable,
  savable,
  saved,
}: CodeSnippet & {
  deletable?: boolean;
  savable?: boolean;
}) => {
  const { confirm } = useConfirmModal();

  const handleDeleteClick = () => {
    confirm({
      title: 'Are you sure you want to delete this code?',
      message: 'This action can’t be undone.',
      titleColor: 'red',
      confirmText: 'Yes',
    });
  };

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
        {savable && (
          <Button
            color="lightGray"
            varient="fill"
            icon={saved === true ? 'bookmark' : 'regBookmark'}
          >
            {saved ? 'Unsave' : 'Save'}
          </Button>
        )}
        {deletable && (
          <Button
            color="red"
            varient="fill"
            icon="bin"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        )}
      </div>
    </Box>
  );
};

export default CodeSnippets;
