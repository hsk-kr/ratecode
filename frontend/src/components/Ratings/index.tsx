import { CiStar } from 'react-icons/ci';
import Text from '../Text';

type RatingsProps = {
  ratingCnt: number;
};

const Ratings = ({ ratingCnt }: RatingsProps) => {
  return (
    <div className="flex items-center gap-1">
      <CiStar />
      <Text>{ratingCnt} Ratings</Text>
    </div>
  );
};

export default Ratings;
