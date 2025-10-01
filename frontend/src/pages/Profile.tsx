import { useState, type ComponentProps } from 'react';
import BackButton from '../components/BackButton';
import Tab from '../components/Tab';
import { FaRegBookmark } from 'react-icons/fa';
import { IoCodeOutline } from 'react-icons/io5';
import AccountInformation from '../components/AccountInformation';
import DeleteAccount from '../components/DeleteAccount';
import CodeSnippets from '../components/CodeSnippets';
import CodeSaves from '../components/CodeSaves';

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
      icon: <IoCodeOutline />,
    },
    {
      color: 'purple',
      label: 'Saved (5)',
      icon: <FaRegBookmark className="text-xs" />,
    },
  ];

  const MY_INFO = 0;
  const MY_CODE = 1;
  const SAVED = 2;

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <Tab
        items={tabItems}
        selectedIndex={selectedTabIndex}
        onChange={setSelectedTabIndex}
      />
      {selectedTabIndex === MY_INFO ? (
        <div className="flex flex-col gap-4">
          <AccountInformation />
          <DeleteAccount />
        </div>
      ) : null}
      {selectedTabIndex === MY_CODE ? <CodeSnippets type="mycode" /> : null}
      {selectedTabIndex === SAVED ? <CodeSnippets type="save" /> : null}
    </div>
  );
};

export default Profile;
