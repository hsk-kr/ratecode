import { useCallback, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import Box from '../../components/Box';
import Text from '../../components/Text';

const Rate = () => {
  return (
    <Box color="darkGray" className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <Star fill size="sm" />
        <Text color="white" size="md">
          Rate This Code
        </Text>
      </div>
      <div className="flex gap-6">
        <RateStar />
        <RateLabel />
      </div>
      <RateChart />
    </Box>
  );
};

const RateStar = () => {
  const [rate, setRate] = useState(0);

  const handleRateChange = useCallback(
    (score: number) => () => {
      setRate(score);
    },
    []
  );

  return (
    <div className="flex gap-2">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <Star
            key={idx}
            selectable
            fill={idx < rate}
            size="lg"
            onClick={handleRateChange(idx + 1)}
          />
        ))}
    </div>
  );
};

const RateLabel = () => {
  return (
    <div className="flex gap-2 items-center">
      <Text color="gray" size="md">
        3.5 avg • 21 ratings
      </Text>
      <Text color="cyan" size="md">
        (You rated 3 stars)
      </Text>
    </div>
  );
};

const RateChart = () => {
  const scores = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col gap-2 ">
      {scores.map((score) => (
        <div className="flex gap-2 items-center" key={score}>
          <Text color="white">{score}</Text>
          <Gauge percentage={score * 10} />
          <Text color="gray">(10)</Text>
        </div>
      ))}
    </div>
  );
};

const Star = ({
  fill = false,
  size,
  selectable = false,
  onClick,
}: {
  fill?: boolean;
  size: 'sm' | 'md' | 'lg';
  selectable?: boolean;
  onClick?: VoidFunction;
}) => {
  const sizes: Record<typeof size, number> = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  const fillClassName = fill ? 'text-yellow-400' : 'text-gray-500';

  const hoverClassName = (() => {
    if (!selectable) return '';

    let className = 'transition-all hover:scale-110 cursor-pointer';
    className += fill ? ' hover:text-yellow-400' : ' hover:text-yellow-400';

    return className;
  })();

  const className = twMerge(fillClassName, hoverClassName);

  return fill ? (
    <FaStar className={className} size={sizes[size]} onClick={onClick} />
  ) : (
    <FaRegStar className={className} size={sizes[size]} onClick={onClick} />
  );
};

const Gauge = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full h-2 relative bg-gray-700 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 bottom-0 bg-yellow-400 rounded-full"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

export default Rate;
