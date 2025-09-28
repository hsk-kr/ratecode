import Box from '../Box';
import Text from '../Text';

const AccountInformation = () => {
  return (
    <Box color="darkGray" className="gap-4">
      <div className="flex flex-col gap-1">
        <Text size="md" color="white">
          Account Information
        </Text>
        <Text size="sm" color="gray">
          Your account details and settings
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <Text size="sm" color="gray">
          Email Address
        </Text>
        <div className="bg-gray-800 p-3 rounded border border-gray-600">
          <Text size="md" color="white">
            rate@support.com
          </Text>
        </div>
      </div>
    </Box>
  );
};

export default AccountInformation;
