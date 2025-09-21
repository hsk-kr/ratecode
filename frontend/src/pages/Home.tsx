import { useState } from 'react';
import BrandLabel from '../components/BrandLabel';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Text from '../components/Text';
import Box from '../components/Box';
import NoteList from '../components/NoteList';
import Divider from '../components/Divider';

const Home = () => {
  // TODO: use hook
  const [code, setCode] = useState('');

  const shareDisabled = code.length === 0;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <BrandLabel size="xl" />
        <div className="flex gap-1 mb-8 flex-col md:flex-row">
          <Text color="textDefault" size="lg">
            How does your code look outside your eyes?{' '}
          </Text>
          <Text color="cyan" size="lg">
            Want to know? Share it.
          </Text>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <Editor onCodeChange={setCode} />
      </div>
      <div className="flex justify-center gap-2 mb-8">
        <Button
          disabled={shareDisabled}
          color="cyan"
          icon="cloudUpload"
          varient="fill"
          hoverAction="scale"
          wide
        >
          Share
        </Button>
        <Button color="purple" icon="branch" wide>
          Rate Others
        </Button>
      </div>
      <Box color="gray" center className="max-w-3xl mx-auto">
        <Text color="cyan" size="xl" className="mb-8">
          What's readable code?
        </Text>
        <NoteList
          notes={[
            {
              color: 'cyan',
              title: 'Names should say what they do',
              desc: "Don't make readers guess — variables, functions, and classes should explain themselves.",
            },
            {
              color: 'blue',
              title: 'Comments explain why, not what',
              desc: "Use comments when the reasoning isn't obvious. Outdated comments cause confusion.",
            },
            {
              color: 'purple',
              title: 'Consistency beats cleverness',
              desc: 'Stick to patterns and styles that others in the codebase already use.',
            },
            {
              color: 'red',
              title: 'Keep functions small',
              desc: 'Easier to test, easier to read, less brain-burn.',
            },
            {
              color: 'orange',
              title: 'Avoid magic numbers/strings',
              desc: 'Use constants or enums — they tell the story better.',
            },
            {
              color: 'yellow',
              title: 'Error handling matters',
              desc: 'Clear error messages save future devs (including you) from pain.',
            },
            {
              color: 'green',
              title: "Don't over-engineer",
              desc: 'Simple solutions usually age better than "clever" ones.',
            },
            {
              color: 'teal',
              title: 'Readability > premature optimisation',
              desc: 'Write for humans first, machines later (unless performance is critical).',
            },
          ]}
        />
        <Divider className="my-6" />
        <div className="p-2 flex flex-col items-center gap-2">
          <Text color="gray">
            Best practices? Endless. Some you'll agree with, some you won't.
          </Text>
          <Text color="gray">
            But is your code truly <Text color="cyan">readable</Text> — or just{' '}
            <Text color="purple">familiar?</Text>
          </Text>
          <Text color="gray">
            {' '}
            There's only one way to find out —{' '}
            <Text color="cyan">share it</Text>.
          </Text>
        </div>
      </Box>
    </>
  );
};

export default Home;
