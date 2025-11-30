import BrandLabel from '../BrandLabel';
import Text from '../Text';
import Button from '../Button';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';
import Box from '../Box';
import useOAuthUrl from '../../hooks/apis/useOAuthUrl';

const SignInForm = () => {
  const { getOAuthUrl, isOAuthUrlLoading } = useOAuthUrl();

  const handleGoogleLogin = () => {
    getOAuthUrl(undefined, {
      onSuccess: ({ oauthUrl }) => {
        window.location.href = oauthUrl;
      },
    });
  };

  return (
    <Box center color="darkGray" className="max-w-lg w-full gap-2">
      <BrandLabel size="md" />
      <Text color="white" size="lg">
        Welcome to RateCode
      </Text>
      <Text color="gray" size="md">
        Sign in with Google to share your code and rate others
      </Text>
      <div className="my-6">
        <Button
          color="cyan"
          varient="fill"
          size="md"
          disabled={isOAuthUrlLoading}
          onClick={handleGoogleLogin}
        >
          <FaGoogle /> Continue With Google
        </Button>
      </div>
      <div>
        <Text color="gray" size="xs">
          By signing in, you agree to our{' '}
          <Link to="/terms">
            <Text color="cyan" size="xs">
              Terms of Service
            </Text>
          </Link>{' '}
          and{' '}
          <Link to="/policy">
            <Text color="cyan" size="xs">
              Privacy Policy
            </Text>
          </Link>
        </Text>
      </div>
    </Box>
  );
};

export default SignInForm;
