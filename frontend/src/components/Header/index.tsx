import { Link } from 'react-router';
import Button from '../Button';
import BrandLabel from '../BrandLabel';
import AttachedPopup from '../AttachedPopup';
import type { ComponentProps } from 'react';

import { IoPerson } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';

const Header = () => {
  const popupItems: ComponentProps<typeof AttachedPopup>['items'] = [
    {
      label: 'Profile',
      color: 'white',
      icon: IoPerson,
    },
    {
      divider: true,
    },
    {
      label: 'Logout',
      color: 'red',
      icon: IoIosLogOut,
    },
  ];

  return (
    <nav className="h-16 sticky border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm top-0 z-50 flex px-8 box-border justify-center">
      <div className="flex justify-between w-full max-w-5xl items-center h-full">
        <Link to="/">
          <BrandLabel size="md" />
        </Link>
        <div className="flex gap-1">
          <AttachedPopup items={popupItems}>
            <Button color="cyan" icon="profile" varient="outline" />
          </AttachedPopup>
          <Link to="/signin">
            <Button color="cyan" icon="profile" varient="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
