import BackButton from '../components/BackButton';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
  return (
    <div className="max-w-lg w-full mx-auto">
      <BackButton />
      <div className="flex justify-center mt-8">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
