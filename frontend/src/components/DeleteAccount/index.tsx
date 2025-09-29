import Box from '../Box';
import Text from '../Text';
import TextWithIcon from '../TextWithIcon';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiWarning } from 'react-icons/ci';
import Button from '../Button';
import { useConfirmModal } from '../modals/ConfirmModal';

const DeleteAccount = () => {
  const { confirm } = useConfirmModal();

  const handleDeleteClick = () => {
    confirm({
      title: 'Are you absolutely sure?',
      message:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      titleColor: 'red',
      confirmationPhrase: 'delete my account',
      confirmText: 'Yes, delete my account',
    });
  };

  return (
    <Box color="darkGray" className="gap-4 border-red-500">
      <div className="flex flex-col gap-1">
        <TextWithIcon
          icon={RiDeleteBin6Line}
          iconClassName="text-xl"
          color="red"
          size="md"
        >
          Delete Account
        </TextWithIcon>
        <Text size="md" color="gray">
          Permanently delete your RateCode account and all associated data.
        </Text>
      </div>
      <Box color="red" className="border-red-500 py-4 px-3 gap-2">
        <TextWithIcon
          icon={CiWarning}
          iconClassName="text-xl text-white"
          color="red"
          size="md"
        >
          Warning
        </TextWithIcon>
        <Text color="textDefault" size="sm">
          This action cannot be undone. This will permanently delete your
          account, all your code snippets, bookmarks, and remove all associated
          data from our servers.
        </Text>
      </Box>
      <Button
        color="red"
        varient="fill"
        icon="bin"
        className="w-fit font-bold"
        onClick={handleDeleteClick}
      >
        Delete My Account
      </Button>
    </Box>
  );
};

export default DeleteAccount;
