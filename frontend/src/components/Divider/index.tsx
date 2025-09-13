import { twMerge } from 'tailwind-merge';

type DividerProps = {
  className?: string;
};

const Divider = ({ className }: DividerProps) => {
  return <div className={twMerge(`w-full bg-gray-700 h-[1px]`, className)} />;
};

export default Divider;
