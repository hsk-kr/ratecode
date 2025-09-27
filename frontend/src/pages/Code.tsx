import BackButton from '../components/BackButton';
import Badge from '../components/Badge';
import BookmarkButton from '../components/BookmarkButton';
import Box from '../components/Box';
import Button from '../components/Button';
import CodeViewer from '../components/CodeViewer';
import DateLabel from '../components/DateLabel';
import Text from '../components/Text';
import Views from '../components/Views';

const Code = () => {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
      <Header />
      <Guide />
      <Buttons />
      <CodeViewer title="fabcdd" language="javascript" />
      <div className="flex justify-center mt-8">hi</div>
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

const Buttons = () => {
  return (
    <div className="flex gap-3">
      <Button color="cyan" varient="fill" icon="code">
        Copy Code
      </Button>
      <Button color="purple" varient="fill" icon="copy">
        Copy Link
      </Button>
      <BookmarkButton bookmarked={true} />
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
      <div className="flex justify-between">
        <BackButton />
        <Badge color="cyan" className="md:hidden">
          javascript
        </Badge>
      </div>
      <div className="flex items-center gap-4 justify-between">
        <Badge color="cyan" className="hidden md:block">
          javascript
        </Badge>
        <Views views={52} />
        <DateLabel date={new Date()} />
      </div>
    </div>
  );
};

export default Code;
