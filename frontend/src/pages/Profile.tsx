import { useMemo, type ComponentProps } from 'react';
import BackButton from '../components/BackButton';
import Tab from '../components/Tab';
import { FaRegBookmark } from 'react-icons/fa';
import { IoCodeOutline } from 'react-icons/io5';
import AccountInformation from '../components/AccountInformation';
import DeleteAccount from '../components/DeleteAccount';
import CodeSnippets from '../components/CodeSnippets';
import useQueryState from '../hooks/useQueryState';

const Profile = () => {
  const [tab, setTab] = useQueryState('tab', String, 'mycode');
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

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        setTab('myinfo');
        break;
      case 1:
        setTab('mycode');
        break;
      case 2:
        setTab('saved');
        break;
      default:
        break;
    }
  };

  const selectedTabIndex = useMemo(() => {
    switch (tab) {
      case 'myinfo':
        return 0;
      case 'mycode':
        return 1;
      case 'saved':
        return 2;
      default:
        return -1;
    }
  }, [tab]);

  return (
    <div className="flex flex-col gap-6">
      <BackButton />
      <Tab
        items={tabItems}
        selectedIndex={selectedTabIndex}
        onChange={handleTabChange}
      />
      {tab === 'myinfo' ? (
        <div className="flex flex-col gap-4">
          <AccountInformation />
          <DeleteAccount />
        </div>
      ) : null}
      {tab === 'mycode' ? <CodeSnippets type="mycode" /> : null}
      {tab === 'saved' ? <CodeSnippets type="save" /> : null}
    </div>
  );
};

export default Profile;
