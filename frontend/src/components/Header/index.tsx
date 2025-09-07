import { Link } from 'react-router';
import Text from '../Text';
import AnimatedIcon from '../AnimatedIcon';
import Button from '../Button';

const Header = () => {
  return (
    <nav className="h-16 sticky border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm top-0 z-50 flex items-center px-8 box-border justify-between">
      <Link to="/" className="relative">
        <Text size="xl" color="cyan">
          ReetCode
        </Text>
        <AnimatedIcon size="xs" color="cyan" />
      </Link>
      <Button color="cyan" icon="profile" varient="outline">
        Sign In
      </Button>
    </nav>
  );
};

export default Header;
