import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  let navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <button
      className="inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
      onClick={back}
    >
      <FaArrowLeft />
      Back
    </button>
  );
};

export default BackButton;
