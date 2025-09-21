import { Link } from 'react-router';
import Button from '../Button';
import BrandLabel from '../BrandLabel';

const Header = () => {
  return (
    <nav className="h-16 sticky border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm top-0 z-50 flex px-8 box-border justify-center">
      <div className="flex justify-between w-full max-w-5xl items-center h-full">
        <Link to="/">
          <BrandLabel size="md" />
        </Link>
        <Link to="/signin">
          <Button color="cyan" icon="profile" varient="outline">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
