import { useState } from 'react';
import BrandLabel from '../components/BrandLabel';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Text from '../components/Text';

const Home = () => {
  // TODO: use hook
  const [code, setCode] = useState('');

  const shareDisabled = code.length === 0;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <BrandLabel size="xl" />
        <div className="flex gap-1 mb-8">
          <Text color="textDefault" size="lg">
            How does your code look outside your eyes?{' '}
          </Text>
          <Text color="cyan" size="lg">
            {' '}
            Want to know? Share it.
          </Text>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <Editor onCodeChange={setCode} />
      </div>
      <div className="flex justify-center gap-2">
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
    </>
  );
};

export default Home;
