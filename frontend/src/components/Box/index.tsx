import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BoxProps = {
  color: 'gray' | 'darkGray' | 'red';
  className?: string;
  center?: boolean;
  children: ReactNode;
};

const Box = ({ children, center, color, className: _className }: BoxProps) => {
  const className = twMerge(
    'rounded-lg p-8 border border-gray-700 flex flex-col',
    center ? 'items-center' : '',
    color === 'gray' ? 'bg-gray-800/50' : '',
    color === 'darkGray' ? 'bg-gray-900' : '',
    color === 'red' ? 'bg-red-900/20' : '',
    _className
  );

  return <div className={className}>{children}</div>;
};

export default Box;
