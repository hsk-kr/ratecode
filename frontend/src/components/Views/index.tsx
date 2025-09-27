import { LuEye } from 'react-icons/lu';
import Text from '../Text';

type ViewsProps = {
  views: number;
};

const Views = ({ views }: ViewsProps) => {
  return (
    <div className="flex items-center gap-1">
      <LuEye />
      <Text>{views} views</Text>
    </div>
  );
};

export default Views;
