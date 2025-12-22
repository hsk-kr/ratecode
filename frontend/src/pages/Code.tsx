import BackButton from '../components/BackButton';
import Badge from '../components/Badge';
import SaveButton from '../components/SaveButton';
import Box from '../components/Box';
import Button from '../components/Button';
import CodeViewer from '../components/CodeViewer';
import DateLabel from '../components/DateLabel';
import Text from '../components/Text';
import Views from '../components/Views';
import Rate from '../components/Rate';
import useCodeApis from '../hooks/apis/useCodeApis';
import { useParams } from 'react-router';
import CodeError from './CodeError';

const Code = () => {
  const params = useParams();
  const { code, isGetCodeLoading, getCodeError } = useCodeApis({
    uuid: params.uuid!,
  });

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleCodeCopy = () => {
    navigator.clipboard.writeText(code?.code || '');
  };

  if (isGetCodeLoading || !code) return null;

  if (getCodeError !== null) {
    return (
      <CodeError error={getCodeError.status === 404 ? 'notfound' : 'unknown'} />
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Header
        language={code.language}
        createdAt={new Date(code.createdAt)}
        views={code.views}
      />
      <Guide />
      <Buttons onCodeCopy={handleCodeCopy} onLinkCopy={handleLinkCopy} />
      <CodeViewer title={code.uuid} language={code.language} code={code.code} />
      <Rate />
    </div>
  );
};

const Guide = () => {
  const points = [
    'Easy to read?',
    'Would you use it?',
    'Good or bad?',
    'Your honest opinion?',
  ];

  return (
    <Box color="darkGray" className="flex flex-col gap-3">
      <Text size="md" color="white">
        What do you think about this code?
      </Text>
      <ul className="flex flex-col md:flex-row justify-between">
        {points.map((point, pointIdx) => (
          <li key={pointIdx}>
            <Text color="gray" size="sm">
              {point}
            </Text>
          </li>
        ))}
      </ul>
      <Text color="cyan" size="xs">
        It's up to you - rate however you feel about it.
      </Text>
    </Box>
  );
};

const Buttons = ({
  onCodeCopy,
  onLinkCopy,
}: {
  onCodeCopy: VoidFunction;
  onLinkCopy: VoidFunction;
}) => {
  return (
    <div className="flex gap-3">
      <Button color="cyan" varient="fill" icon="code" onClick={onCodeCopy}>
        Copy Code
      </Button>
      <Button color="purple" varient="fill" icon="copy" onClick={onLinkCopy}>
        Copy Link
      </Button>
      <SaveButton saved={true} />
    </div>
  );
};

const Header = ({
  language,
  views,
  createdAt,
}: {
  language: string;
  views: number;
  createdAt: Date;
}) => {
  return (
    <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
      <div className="flex justify-between">
        <BackButton />
        <Badge color="cyan" className="md:hidden">
          {language}
        </Badge>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <Badge color="cyan" className="hidden md:block">
          {language}
        </Badge>
        <Views views={views} />
        <DateLabel date={createdAt} />
      </div>
    </div>
  );
};

export default Code;
