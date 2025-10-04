import { CiCalendar } from 'react-icons/ci';
import Text from '../Text';
import dayjs from 'dayjs';

type DateLabelProps = {
  date: Date;
};

const DateLabel = ({ date }: DateLabelProps) => {
  console.log('test');
  const dateString = dayjs(date).format('llll');
  return (
    <div className="flex items-center gap-1">
      <CiCalendar />
      <Text>{dateString}</Text>
    </div>
  );
};

export default DateLabel;
