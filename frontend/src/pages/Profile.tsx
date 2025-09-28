import { useState, type ComponentProps } from 'react';
import BackButton from '../components/BackButton';
import Box from '../components/Box';
import Tab from '../components/Tab';
import Text from '../components/Text';

import { FaRegBookmark } from 'react-icons/fa';
import { IoCodeOutline } from 'react-icons/io5';
import AccountInformation from '../components/AccountInformation';
import DeleteAccount from '../components/DeleteAccount';

const Profile = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabItems: ComponentProps<typeof Tab>['items'] = [
    {
      color: 'cyan',
      label: 'My Info',
    },
    {
      color: 'cyan',
      label: 'My Code (10)',
      icon: IoCodeOutline,
    },
    {
      color: 'purple',
      label: 'Saved (5)',
      icon: FaRegBookmark,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <Tab
        items={tabItems}
        selectedIndex={selectedTabIndex}
        onChange={setSelectedTabIndex}
      />
      {selectedTabIndex === 0 ? (
        <div className="flex flex-col gap-4">
          <AccountInformation />
          <DeleteAccount />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
