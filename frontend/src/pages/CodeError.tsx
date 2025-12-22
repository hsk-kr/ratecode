import { Link } from 'react-router';
import Text from '../components/Text';

type CodeErrorProps = {
  error: 'notfound' | 'unknown';
};

const CodeError = ({ error }: CodeErrorProps) => {
  const message = (() => {
    if (error === 'notfound') {
      return 'Oops… we couldn’t find the code.';
    }

    return 'Oops! Something went wrong. Please try again later.';
  })();

  return (
    <div className="text-center space-y-4 mt-12">
      <Text color="cyan" size="2xl" className="block">
        {message}
      </Text>
      <Text color="textDefault" size="xl" className="block">
        <Link to="/">Go Home</Link>
      </Text>
    </div>
  );
};

export default CodeError;
